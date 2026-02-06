import config from "../../config";
import type { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const regUserQuery = async ({ name, email, password, role }: IUser) => {
    const existingUser = await User.findOne({ email })

    if (existingUser)
        throw new Error('Email is already in use.')

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashPassword, role })

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15m" })
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" })

    user.token = refreshToken
    await user.save()

    return { user, accessToken, refreshToken }
}

export const loginUserQuery = async ({ email, password }: IUser) => {
    const existingUser = await User.findOne({ email })

    if (!existingUser)
        throw new Error("Invalid email or password")

    const matchedPassword = bcrypt.compare(password, existingUser.password)

    if (!matchedPassword)
        throw new Error("Invalid credentials")

    const payload = {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    }

    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' })

    existingUser.token = refreshToken
    await existingUser.save()

    return { existingUser, accessToken, refreshToken }
}

export const allUsersQuery = async () => {
    const users = await User.find()
    return users
}