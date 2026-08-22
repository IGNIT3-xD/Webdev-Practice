import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AppointmentService } from "./appointment.service";
import type { IUser } from "./appointment.interface";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const user = req.user as IUser;

	const result = await AppointmentService.bookAppointmentService(payload, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Book appointment - create payment successfully",
		data: result,
	});
});

const createPaymentCallback = catchAsync(
	async (req: Request, res: Response) => {
		// console.log(req.query);

		const { redirectUrl } =
			await AppointmentService.createPaymentCallbackService(req.query);
		// console.log(executePaymentResult);

		res.redirect(redirectUrl);

		// sendResponse(res, {
		//     statusCode: httpStatus.OK,
		//     success: true,
		//     message: "Payment query get successfully",
		//     data: result,
		// });
	},
);

const repayForAppointment = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;
	const user = req.user as IUser;

	const result = await AppointmentService.repayForAppointmentService(
		payload,
		user,
	);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Booking payment re-initialized successfully",
		data: result,
	});
});

const cancelAppointment = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AppointmentService.cancelAppointmentService(payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Booking canceled successfully",
		data: result,
	});
});

export const AppointmentController = {
	bookAppointment,
	createPaymentCallback,
	repayForAppointment,
	cancelAppointment,
};
