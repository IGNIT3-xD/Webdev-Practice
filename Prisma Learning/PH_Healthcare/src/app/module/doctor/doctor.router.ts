import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { upload } from "../../lib/multer";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";

const doctorRouter = Router();

doctorRouter.post(
	"/apply-as-doctor",
	upload.fields([
		{
			name: "resume",
			maxCount: 1,
		},
		{
			name: "additionalFiles",
			maxCount: 3,
		},
	]),
	DoctorController.applyAsDoctor,
);

doctorRouter.post("/apply-as-doctor/verify", DoctorController.verifyAsDoctor);

doctorRouter.post(
	"/approve-doctor",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	DoctorController.approveDoctor,
);

doctorRouter.get(
	"/all-doctors",
	auth(Role.ADMIN, Role.SUPER_ADMIN),
	DoctorController.allDoctors,
);

export default doctorRouter;
