import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { User } from "./user.interface";
import config from "../../config";

export const createUserQuery = async (payload: User) => {
    const { email, password, profile_photo, bio } = payload

    // Validate user
    const isExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isExist)
        throw new Error("User is already exist");

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS))

    // Register user
    const regUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            profile: {
                create: {
                    profile_photo,
                    bio
                }
            }
        }
    });

    // Profile creation
    // await prisma.profile.create({
    //     data: {
    //         user_id: regUser.id,
    //         profile_photo,
    //         bio
    //     }
    // });

    // Send user
    const user = await prisma.user.findUnique({
        where: {
            id: regUser.id,
            email: regUser.email || email
        },
        omit: { password: true },
        include: {
            profile: true
        }
    });

    return user;
}

export const myProfileQuery = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: { id: userId },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return user
}

export const updateProfileQuery = async (userId: string, payload: any) => {
    const { bio, profile_photo } = payload
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            profile: {
                update: {
                    profile_photo,
                    bio
                }
            }
        },
        omit: { password: true },
        include: { profile: true }
    })

    return updatedUser;
}