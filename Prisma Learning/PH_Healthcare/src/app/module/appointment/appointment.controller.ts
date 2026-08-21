import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppointmentService } from "./appointment.service";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.bookAppointmentService()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book appointment - create payment successfully",
        data: result,
    });
})

const createPaymentCallback = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query);

    const { executePaymentResult, redirectUrl } = await AppointmentService.createPaymentCallbackService(req.query)
    console.log(executePaymentResult);

    res.redirect(redirectUrl)

    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "Payment query get successfully",
    //     data: result,
    // });
})

export const AppointmentController = {
    bookAppointment,
    createPaymentCallback
};