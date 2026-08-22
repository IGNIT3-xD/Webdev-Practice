import {
	AppointmentStatus,
	PaymentStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";
import { prisma } from "../../lib/prisma";
import type { IUser } from "./appointment.interface";

const bookAppointmentService = async (payload: any, user: IUser) => {
	const transectionResult = await prisma.$transaction(async (tx) => {
		const appointment = await tx.appointment.create({
			data: {},
		});

		const bkasIdToken = await getBkashIdToken();
		// console.log(bkasIdToken);

		if (!bkasIdToken) {
			throw new Error("Bkash id token not found.");
		}

		const createPayment = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: bkasIdToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({
					agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
					mode: "0011",
					payerReference: user.email,
					callbackURL: `${config.backend_url}/api/v1/appointment/book-appointment/payment/callback`,
					merchantAssociationInfo: "MI05MID54RF09123456One",
					amount: "1299",
					currency: "BDT",
					intent: "sale",
					merchantInvoiceNumber: appointment.id,
				}),
			},
		);

		const paymentResult = await createPayment.json();

		await tx.payment.create({
			data: {
				appointmentId: appointment.id,
				amount: paymentResult.amount,
				merchantInvoiceNumber: appointment.id,
				gatewayResponse: paymentResult,
				bkashpaymentId: paymentResult.paymentID,
				payerReference: user.email,
			},
		});

		return paymentResult.bkashURL;
	});

	return transectionResult;
};

const createPaymentCallbackService = async (query: Record<string, any>) => {
	const transectionResult = await prisma.$transaction(async (tx) => {
		const paymentId = query.paymentID;
		const status = query.status;

		if (!paymentId) {
			throw new Error("Invalid payment id.");
		}

		if (!status) {
			throw new Error("Payment status false.");
		}

		const bkashIdToken = await getBkashIdToken();

		if (!bkashIdToken) {
			throw new Error("Bkash id token not found.");
		}

		const executePayment = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/execute`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: bkashIdToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({
					paymentID: paymentId,
				}),
			},
		);

		const executePaymentResult = await executePayment.json();

		if (status === "success") {
			await tx.appointment.update({
				where: {
					id: executePaymentResult.merchantInvoiceNumber,
				},
				data: {
					appointmentStatus: AppointmentStatus.CONFIRMED,
				},
			});

			await tx.payment.update({
				where: {
					appointmentId: executePaymentResult.merchantInvoiceNumber,
				},
				data: {
					paymentStatus: PaymentStatus.PAID,
					paidAt: executePaymentResult.paymentExecuteTime,
					bkashTrxId: executePaymentResult.trxID,
					gatewayResponse: executePaymentResult,
				},
			});

			return {
				redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=success`,
			};
		} else if (status === "failure") {
			await tx.payment.update({
				where: {
					bkashpaymentId: paymentId,
				},
				data: {
					paymentStatus: PaymentStatus.FAILED,
					gatewayResponse: executePaymentResult,
				},
			});

			return {
				redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=failure`,
			};
		} else if (status === "cancel") {
			await tx.payment.update({
				where: {
					bkashpaymentId: executePaymentResult.paymentID,
				},
				data: {
					paymentStatus: PaymentStatus.CANCELED,
					gatewayResponse: executePaymentResult,
				},
			});

			return {
				redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=cancel`,
			};
		} else {
			return {
				executePaymentResult,
				redirectUrl: `${config.frontend_url}/dashboard/my-appointments`,
			};
		}
	});

	return transectionResult;
};

const repayForAppointmentService = async (payload: any, user: IUser) => {
	const appointmentId = payload.appointmentId;

	const appointment = await prisma.appointment.findUnique({
		where: { id: appointmentId },
	});

	if (!appointment) {
		throw new Error("Appointment not found.");
	}

	if (appointment.appointmentStatus !== "PENDING") {
		throw new Error(`Appointment is already ${appointment.appointmentStatus}.`);
	}

	const bkashIdToken = await getBkashIdToken();

	if (!bkashIdToken) {
		throw new Error("Bkash id token not found.");
	}

	const createPayment = await fetch(
		`${config.bkash_base_url}/tokenized/checkout/create`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: bkashIdToken,
				"X-App-Key": config.bkash_app_key,
			},
			body: JSON.stringify({
				agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
				mode: "0011",
				payerReference: user.email,
				callbackURL: `${config.backend_url}/api/v1/appointment/book-appointment/payment/callback`,
				merchantAssociationInfo: "MI05MID54RF09123456One",
				amount: "1299",
				currency: "BDT",
				intent: "sale",
				merchantInvoiceNumber: appointment.id,
			}),
		},
	);

	const paymentResult = await createPayment.json();

	await prisma.payment.update({
		where: {
			appointmentId: appointment.id,
		},
		data: {
			merchantInvoiceNumber: appointment.id,
			bkashpaymentId: paymentResult.paymentID,
			gatewayResponse: paymentResult,
		},
	});

	return paymentResult.bkashURL;
};

const cancelAppointmentService = async (payload: any) => {
	const transectionResult = await prisma.$transaction(async (tx) => {
		const appointmentId = payload.appointmentId;

		const appointment = await tx.appointment.findUnique({
			where: {
				id: appointmentId,
			},
			include: {
				payment: true,
			},
		});

		if (!appointment) {
			throw new Error("Appointment not found.");
		}

		if (
			appointment.appointmentStatus === "ONGOING" ||
			appointment.appointmentStatus === "CANCELED" ||
			appointment.appointmentStatus === "COMPLETED"
		) {
			throw new Error(
				`Appointment is already ${appointment.appointmentStatus}.`,
			);
		}

		const bkashIdToken = await getBkashIdToken();

		if (!bkashIdToken) {
			throw new Error("Bkash id token not found.");
		}

		const updateAppointment = await tx.appointment.update({
			where: {
				id: appointment.id,
			},
			data: {
				appointmentStatus: AppointmentStatus.CANCELED,
			},
		});

		const refundPayment = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/payment/refund`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: bkashIdToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({
					paymentID: appointment.payment?.bkashpaymentId,
					trxID: appointment.payment?.bkashTrxId,
					amount: appointment.payment?.amount.toString(),
					sku: "test",
					reason: "test",
				}),
			},
		);

		const refundPaymentResult = await refundPayment.json();

		const updatedPayment = await tx.payment.update({
			where: {
				appointmentId: appointment.id,
			},
			data: {
				refundTrxId: refundPaymentResult.refundTrxID,
				refundAmount: refundPaymentResult.amount,
				refundedAt: refundPaymentResult.completedTime,
				refundReason: "test",
				paymentStatus: PaymentStatus.REFUNDED,
				gatewayResponse: refundPaymentResult,
			},
		});

		return {
			appointment: updateAppointment,
			payment: updatedPayment,
		};
	});

	return transectionResult;
};

export const AppointmentService = {
	bookAppointmentService,
	createPaymentCallbackService,
	repayForAppointmentService,
	cancelAppointmentService,
};
