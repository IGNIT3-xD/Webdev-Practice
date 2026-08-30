import { DoctorVerficationStatus } from "../../../generated/prisma/enums";

export interface IVerifyDoc {
	email: string;
	otp: string;
}

export interface IApproveDoc {
	doctorId: string;
	verificationStatus: DoctorVerficationStatus;
	rejectReason?: string;
}
