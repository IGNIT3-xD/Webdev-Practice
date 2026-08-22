import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const appointmentRouter = Router();

appointmentRouter.post(
	"/book-appointment",
	auth(Role.PATIENT),
	AppointmentController.bookAppointment,
);
appointmentRouter.get(
	"/book-appointment/payment/callback",
	AppointmentController.createPaymentCallback,
);
appointmentRouter.post(
	"/book-appointment-reinitialize",
	auth(Role.PATIENT),
	AppointmentController.repayForAppointment,
);
appointmentRouter.post(
	"/cancel-appointment",
	auth(Role.PATIENT, Role.ADMIN, Role.SUPER_ADMIN),
	AppointmentController.cancelAppointment,
);

export default appointmentRouter;
