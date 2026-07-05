import type { Response } from "express";

type TResponseData<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number
    }
}

export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
}   