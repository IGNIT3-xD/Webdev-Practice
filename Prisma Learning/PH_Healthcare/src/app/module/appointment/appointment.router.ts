import { Router } from "express";
import { AppointmentController } from "./appointment.controller";

const appointmentRouter = Router();

appointmentRouter.post('/book-appointment', AppointmentController.bookAppointment)
appointmentRouter.get('/book-appointment/payment/callback', AppointmentController.createPaymentCallback)

export default appointmentRouter;
