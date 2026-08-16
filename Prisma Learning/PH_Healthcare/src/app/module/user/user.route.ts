import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { UserController } from "./user.controller";
import { upload } from "../../lib/multer";

const userRouter = Router();

userRouter.patch(
	"/update-profile-pic",
	auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
	upload.single("profilePic"),
	UserController.updateProfilePic,
);

export default userRouter;
