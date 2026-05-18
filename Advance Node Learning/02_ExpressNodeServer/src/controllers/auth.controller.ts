import type { Request, Response } from 'express'
import { generateRefreshToken, loginQuery } from '../services/auth.service'

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        const user = await loginQuery(email, password)
        const { refreshToken } = user

        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        })

        res.status(201).json({ success: true, message: "Login successfully", data: user })
    }
    catch (err: any) {
        if (err.message === "User does not exist")
            res.status(404).json({ success: false, message: err.message })

        else if (err.message === "Invalid Credentials")
            res.status(404).json({ success: false, message: err.message })

        else
            res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    // console.log(req.cookies);

    try {
        const user = await generateRefreshToken(req.cookies.refreshToken)

        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        })

        res.status(201).json({ success: true, message: "Access token generate successfully", data: user })
    }
    catch (err: any) {
        if (err.message === "User not found")
            res.status(404).json({ success: false, message: err.message })

        else if (err.message === "Forbidden access")
            res.status(403).json({ success: false, message: err.message })

        else if (err.message === "Unauthorized access")
            res.status(403).json({ success: false, message: err.message })

        else
            res.status(500).json({ success: false, message: err.message, error: err })
    }
}