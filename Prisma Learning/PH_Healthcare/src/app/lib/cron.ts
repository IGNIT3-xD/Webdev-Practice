import cron from "node-cron";
import { prisma } from "./prisma";
import { DoctorVerficationStatus, Role } from "../../generated/prisma/enums";

export const deleteUnverifiedDoctors = async () => {
	cron.schedule("* */10 * * * *", async () => {
		// console.log("Cron job running...");
		try {
			const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
			const deleteDoctos = await prisma.user.deleteMany({
				where: {
					emailVerified: false,
					role: Role.DOCTOR,
					createdAt: { lt: oneHourAgo },
					doctors: {
						doctorStatus: DoctorVerficationStatus.PENDING,
					},
				},
			});

			if (deleteDoctos.count > 0) {
				console.log(
					`CRON: Deleted ${deleteDoctos.count} unverified application olders than one hour.`,
				);
			}
		} catch (error) {
			console.log("CRON: Failed to delete doctors", error);
		}
	});
};
