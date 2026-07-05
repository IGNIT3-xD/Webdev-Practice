import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { loginUserQuery, refreshTokenQuery } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from 'http-status';

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const { accessToken, refreshToken } = await loginUserQuery(payload)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24 hour or 1 day
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "User logged in sucessfully!!",
        data: { accessToken, refreshToken }
    })
})

export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies
    const { accessToken } = await refreshTokenQuery(refreshToken)

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24 hour or 1 day
    })

    sendResponse(res, {
        success: true,
        status: httpsStatus.CREATED,
        message: "Refresh token updated sucessfully!!",
        data: { accessToken }
    })
})