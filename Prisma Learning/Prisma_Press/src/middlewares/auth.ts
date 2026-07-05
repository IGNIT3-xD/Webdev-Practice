import type { NextFunction, Request, Response } from "express"
import { Role } from "../../generated/prisma/enums"
import { catchAsync } from "../utils/catchAsync"
import { jwtUtils } from "../utils/jwt"
import config from "../config"
import type { JwtPayload } from "jsonwebtoken"
import { prisma } from "../lib/prisma"

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken
        if (!token)
            throw new Error("Please, login to access.")

        const varifiedToken = jwtUtils.varifyToken(token, config.JWT_ACCESS_SECRET)
        const { id, email, role } = varifiedToken as JwtPayload
        if (requiredRoles.length && !requiredRoles.includes(role))
            throw new Error("Forbidden access")

        const user = await prisma.user.findUnique({
            where: {
                id, email
            }
        })
        if (!user)
            throw new Error("User not found")

        if (user.active_status === 'BLCOKED')
            throw new Error("You've been blocked")

        req.user = {
            id,
            email,
            role
        }
        next()
    })
}