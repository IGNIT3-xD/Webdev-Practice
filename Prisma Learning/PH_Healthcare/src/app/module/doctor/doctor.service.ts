import { UploadApiResponse } from "cloudinary"
import cloudinary from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "../../../generated/prisma/enums"

const applyAsDoctorService = async (payload: any, resume: Express.Multer.File | null,
    additionalFiles: Express.Multer.File[]) => {

    const email = payload?.user?.email;

    if (!email) {
        throw new Error("Email field is missing in the payload structure.");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        throw new Error("User already exists.");
    }

    const resumeUploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "auto"
            },

            async (error, result) => {
                if (error) {
                    return reject(error)
                }
                if (!result) {
                    return reject(new Error("No result"))
                }
                resolve(result)
            }
        ).end(resume?.buffer)
    });

    const additionalFilesUploadresult = await Promise.all(
        additionalFiles.map(file => {
            return new Promise<UploadApiResponse>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto'
                    },

                    async (error, result) => {
                        if (error) {
                            return reject(error)
                        }
                        if (!result) {
                            return reject(new Error("No result"))
                        }
                        resolve(result)
                    }
                ).end(file.buffer)
            })
        })
    );

    const password = payload.user.password
    const hashedPassword = await bcrypt.hash(password, 8)

    const doctor = await prisma.user.create({
        data: {
            ...payload.user,
            password: hashedPassword,
            role: Role.DOCTOR,
            doctors: {
                create: {
                    name: payload.user.name,
                    email: email,
                    ...payload.doctor,
                    resume: resumeUploadResult.secure_url,
                    resumePublicId: resumeUploadResult.public_id,
                    additionalFiles: additionalFilesUploadresult.map((file) => ({
                        additionalFilesUrl: file.secure_url,
                        additionalFilesPublicId: file.public_id
                    }))
                }
            }
        },
        include: {
            doctors: true
        }
    })

    return doctor
}

export const DoctorService = {
    applyAsDoctorService
}