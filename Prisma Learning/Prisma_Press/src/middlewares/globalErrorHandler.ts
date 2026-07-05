import type { NextFunction, Request, Response } from "express"
import httpsStatus from 'http-status';

export const globalErrorHadnler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: httpsStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
        error: err.stack
    })
}