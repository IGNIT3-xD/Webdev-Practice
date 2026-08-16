import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

const updateProfilePic = catchAsync(async (req: Request, res: Response) => {
	// console.log(req.file);
	const userId = req.user?.userId as string;

	if (!req.file) {
		throw new Error("Picture not uploaded yet!");
	}

	const result = await UserServices.updateProfilePicService(
		req.file.buffer,
		userId,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Profile picture uploaded successfully",
		data: result,
	});
});

export const UserController = {
	updateProfilePic,
};
