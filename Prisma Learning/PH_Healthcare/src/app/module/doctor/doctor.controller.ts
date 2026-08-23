import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { DoctorService } from "./doctor.service";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const resume = files?.['resume'] ? files['resume'][0] : null;
    const additionalFiles = files?.['additionalFiles'] || [];

    // console.log(resume, additionalFiles, payload.data);

    const payload = JSON.parse(req.body.data);

    const result = await DoctorService.applyAsDoctorService(payload, resume, additionalFiles);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Apply as docotor successfully",
        data: result,
    });
});

export const DoctorController = {
    applyAsDoctor
};
