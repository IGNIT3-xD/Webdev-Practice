import type { Request, Response } from "express";
import { createUserQuery } from "./user.services";
import httpsStatus from 'http-status'

export const createUser = async (req: Request, res: Response) => {
    try {
        const paylaod = req.body
        const user = await createUserQuery(paylaod)

        res.status(httpsStatus.CREATED).json({
            success: true,
            status: httpsStatus.CREATED,
            message: "User register successfully",
            data: {
                user
            }
        })
    } catch (error: any) {
        console.log(error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            success: false, message: "Internal server error", error: error.message
        })
    }
}