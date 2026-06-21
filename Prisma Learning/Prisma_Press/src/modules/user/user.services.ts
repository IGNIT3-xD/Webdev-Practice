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
            password: hashedPassword
        }
    });

    // Profile creation
    await prisma.profile.create({
        data: {
            user_id: regUser.id,
            profile_photo,
            bio
        }
    });

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