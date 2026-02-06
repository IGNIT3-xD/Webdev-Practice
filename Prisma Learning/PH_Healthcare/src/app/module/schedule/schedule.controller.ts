import { catchAsync } from "../../utils/catchAsync"
import type { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { ScheduleService } from "./schedule.service";
import type { IUser } from "../appointment/appointment.interface";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const user = req.user as IUser

    const result = await ScheduleService.createScheduleService(payload, user)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule create successfully",
        data: result,
    });
})

export const ScheduleController = {
    createSchedule
}