import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { DoctorVerficationStatus, Role } from "../../../generated/prisma/enums";
import crypto from "crypto";
import { redisClient } from "../../lib/redis";
import path from "path";
import ejs from "ejs";
import { transporter } from "../../lib/nodemailer";
import config from "../../config";
import type { IApproveDoc, IVerifyDoc } from "./doctor.interface";
import type { IUser } from "../appointment/appointment.interface";

const applyAsDoctorService = async (
	payload: any,
	resume: Express.Multer.File | null,
	additionalFiles: Express.Multer.File[],
) => {
	const email = payload?.user?.email;

	if (!email) {
		throw new Error("Email field is missing in the payload structure.");
	}

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		throw new Error("User already exists.");
	}

	const resumeUploadResult = await new Promise<UploadApiResponse>(
		(resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "auto",
					},

					async (error, result) => {
						if (error) {
							return reject(error);
						}
						if (!result) {
							return reject(new Error("No result"));
						}
						resolve(result);
					},
				)
				.end(resume?.buffer);
		},
	);

	const additionalFilesUploadresult = await Promise.all(
		additionalFiles.map((file) => {
			return new Promise<UploadApiResponse>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							resource_type: "auto",
						},

						async (error, result) => {
							if (error) {
								return reject(error);
							}
							if (!result) {
								return reject(new Error("No result"));
							}
							resolve(result);
						},
					)
					.end(file.buffer);
			});
		}),
	);

	const password = payload.user.password;
	const hashedPassword = await bcrypt.hash(password, 8);

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
						additionalFilesPublicId: file.public_id,
					})),
				},
			},
		},
		include: {
			doctors: true,
		},
	});

	const otpKey = `doctor-application-otp:${doctor.email}`;
	const otp = crypto.randomInt(100000, 1000000).toString();

	await redisClient.set(otpKey, otp, {
		expiration: {
			type: "EX",
			value: 5 * 60,
		},
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/register-user-otp.ejs",
	);

	const html = await ejs.renderFile(templatePath, {
		userName: doctor.name,
		otp,
		expirationTime: (5 * 60) / 60,
	});

	await transporter.sendMail({
		from: config.smtp_email_sender,
		to: email,
		subject: "Verify Your Doctor Application",
		html,
	});

	return doctor;
};

const verifyAsDoctorService = async (payload: IVerifyDoc) => {
	const { email, otp } = payload;
	const otpKey = `doctor-application-otp:${email}`;

	const isExist = await prisma.user.findUnique({
		where: {
			email,
			role: Role.DOCTOR,
		},
	});

	if (!isExist) {
		throw new Error("Doctor not exist.");
	}

	if (isExist.emailVerified) {
		throw new Error("Email is already verified.");
	}

	const redisOtp = await redisClient.get(otpKey);

	if (!redisOtp) {
		throw new Error("OTP not found");
	}

	if (redisOtp !== otp) {
		throw new Error("Otp not matched.");
	}

	const verifiedUser = await prisma.user.update({
		where: {
			email,
		},
		data: {
			emailVerified: true,
		},
		omit: { password: true },
		include: { doctors: true },
	});

	await redisClient.del(otpKey);

	return verifiedUser;
};

const approveDoctorService = async (payload: IApproveDoc, user: IUser) => {
	const { doctorId, verificationStatus, rejectReason } = payload;

	const isExist = await prisma.doctor.findUnique({
		where: {
			id: doctorId,
		},
		include: {
			user: true,
		},
	});

	if (!isExist) {
		throw new Error("Doctor application not found.");
	}

	if (!isExist.user.emailVerified) {
		throw new Error("Email not verified.");
	}

	if (isExist.doctorStatus !== DoctorVerficationStatus.PENDING) {
		throw new Error(
			`Doctor application has been already ${isExist.doctorStatus}`,
		);
	}

	if (
		verificationStatus === DoctorVerficationStatus.REJECTED &&
		!rejectReason
	) {
		throw new Error("Rejection reason is required.");
	}

	const updateApplication = await prisma.doctor.update({
		where: { id: doctorId },
		data: {
			doctorStatus: verificationStatus,
			rejectionReason:
				verificationStatus === DoctorVerficationStatus.REJECTED
					? rejectReason
					: null,
			reviewAt: new Date(),
			reviewedBy: user.userId,
		},
	});

	return updateApplication;
};

const getDoctorsService = async () => {
	const doctors = await prisma.doctor.findMany();

	return doctors;
};

export const DoctorService = {
	applyAsDoctorService,
	verifyAsDoctorService,
	approveDoctorService,
	getDoctorsService,
};
