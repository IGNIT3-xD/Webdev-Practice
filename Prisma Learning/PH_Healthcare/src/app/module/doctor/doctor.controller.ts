import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { DoctorService } from "./doctor.service";
import { IUser } from "../appointment/appointment.interface";

const applyAsDoctor = catchAsync(async (req: Request, res: Response) => {
	const files = req.files as { [fieldname: string]: Express.Multer.File[] };
	const resume = files?.["resume"] ? files["resume"][0] : null;
	const additionalFiles = files?.["additionalFiles"] || [];

	// console.log(resume, additionalFiles, payload.data);

	const payload = JSON.parse(req.body.data);

	const result = await DoctorService.applyAsDoctorService(
		payload,
		resume,
		additionalFiles,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Apply as docotor successfully",
		data: result,
	});
});

const verifyAsDoctor = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await DoctorService.verifyAsDoctorService(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Verify doctor application successfully",
		data: result,
	});
});

const approveDoctor = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const user = req.user as IUser;

	const result = await DoctorService.approveDoctorService(payload, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Doctor application status updated successfully",
		data: result,
	});
});

const allDoctors = catchAsync(async (req: Request, res: Response) => {
	const result = await DoctorService.getDoctorsService();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Retrieved all doctors successfully",
		data: result,
	});
});

export const DoctorController = {
	applyAsDoctor,
	verifyAsDoctor,
	approveDoctor,
	allDoctors,
};
