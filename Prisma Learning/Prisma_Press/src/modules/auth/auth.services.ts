import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { IloginUser } from "./auth.interface";
import config from "../../config";
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken'
import { jwtUtils } from "../../utils/jwt";

export const loginUserQuery = async (payload: IloginUser) => {
    const { email, password } = payload

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isPasswordMatched)
        throw new Error("Password is incorrect!!")

    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    // const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET,
    //     { expiresIn: config.JWT_ACCESS_EXPIRES_IN } as SignOptions
    // )
    // const refreshToken = jwt.sign(jwtPayload, config.JWT_REFRSESH_SECRET,
    //     { expiresIn: config.JWT_REFRESH_EXPIRES_IN } as SignOptions
    // )

    const accessToken = jwtUtils.createToken(jwtPayload, config.JWT_ACCESS_SECRET, config.JWT_ACCESS_EXPIRES_IN as SignOptions)
    const refreshToken = jwtUtils.createToken(jwtPayload, config.JWT_REFRSESH_SECRET, config.JWT_REFRESH_EXPIRES_IN as SignOptions)

    return {
        accessToken,
        refreshToken
    };
}

export const refreshTokenQuery = async (refreshToken: string) => {
    const varfiedRefreshToken = jwtUtils.varifyToken(refreshToken, config.JWT_REFRSESH_SECRET)

    const { id } = varfiedRefreshToken as JwtPayload

    const user = await prisma.user.findUniqueOrThrow({
        where: { id }
    })

    if (user.active_status === 'BLCOKED')
        throw new Error("You've been blocked.")

    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.JWT_ACCESS_SECRET, config.JWT_ACCESS_EXPIRES_IN as SignOptions)
    return { accessToken }
}