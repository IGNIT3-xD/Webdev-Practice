import type { NextFunction, Request, Response } from "express";
import { createUserQuery, myProfileQuery, updateProfileQuery } from "./user.services";
import httpsStatus from 'http-status'
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";

// export const createUser = async (req: Request, res: Response) => {
//     try {
//         const paylaod = req.body
//         const user = await createUserQuery(paylaod)

//         res.status(httpsStatus.CREATED).json({
//             success: true,
//             status: httpsStatus.CREATED,
//             message: "User register successfully",
//             data: {
//                 user
//             }
//         })
//     } catch (error: any) {
//         console.log(error);
//         res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
//             success: false, message: "Internal server error", error: error.message
//         })
//     }
// }

export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const user = await createUserQuery(payload)

    // res.status(httpsStatus.CREATED).json({
    //     success: true,
    //     status: httpsStatus.CREATED,
    //     message: "User register successfully",
    //     data: { user }
    // })

    sendResponse(res, {
        status: httpsStatus.CREATED,
        success: true,
        message: "User register successfully",
        data: user
    })
})

export const myProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await myProfileQuery(req.user?.id)

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "User retreived successfully",
        data: user
    })
})

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const payload = req.body

    const updatedUser = await updateProfileQuery(userId, payload)
    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "User updated successfully",
        data: updatedUser
    })
})