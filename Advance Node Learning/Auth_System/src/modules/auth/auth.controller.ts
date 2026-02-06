import type { Request, Response } from "express";
import { allUsersQuery, loginUserQuery, regUserQuery } from "./auth.service";

export const regUser = async (req: Request, res: Response) => {
    try {
        const user = await regUserQuery(req.body)
        // console.log(user);
        const { refreshToken } = user

        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        })

        res.status(201).json({ success: true, message: "User register successfully", data: user })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await loginUserQuery(req.body)
        res.status(200).json({ success: true, message: "User login successfully", data: user })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const allUsers = async (req: Request, res: Response) => {
    try {
        const users = await allUsersQuery()
        res.status(200).json({ success: true, message: "Users fetched successfully", data: users })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}