import type { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from 'jsonwebtoken'

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret,
        { expiresIn } as SignOptions
    )
    return token
}

const varifyToken = (token: string, secret: string) => {
    try {
        const varifiedToken = jwt.verify(token, secret)
        return varifiedToken;
    } catch (error) {
        throw new Error("Invalid token")
    }
}

export const jwtUtils = {
    createToken,
    varifyToken
}