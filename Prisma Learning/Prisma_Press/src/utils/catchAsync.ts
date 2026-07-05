import type { NextFunction, Request, RequestHandler, Response } from "express";
import httpsStatus from 'http-status';

export function catchAsync(fn: RequestHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (error: any) {
            // console.log(error)
            // res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            //     success: false, message: "Internal server error", error: error.message
            // })

            next(error)
        }
    }
}