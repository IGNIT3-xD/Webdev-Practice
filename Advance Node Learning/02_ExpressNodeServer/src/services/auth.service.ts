import { pool } from "../db"
import bcrypt from "bcrypt"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config"

export const loginQuery = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    // console.log(user.rows);

    if (result.rowCount === 0) {
        throw new Error("User does not exist")
    }

    const user = result.rows[0]
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (!matchedPassword)
        throw new Error("Invalid Credentials")

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET, { expiresIn: "1d" })
    const refreshToken = jwt.sign(jwtPayload, config.REF_SECRET, { expiresIn: "1d" })
    // console.log(accessToken);
    return { accessToken, refreshToken }
}

export const generateRefreshToken = async (token: string) => {

    if (!token)
        throw new Error("Unauthorized access")

    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload
    // console.log(decoded);

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email])

    if (result.rowCount === 0)
        throw new Error("User not found")

    const user = result.rows[0]

    if (!user.is_active)
        throw new Error("Forbidden access")

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.REF_SECRET, { expiresIn: "1d" })

    return accessToken
}