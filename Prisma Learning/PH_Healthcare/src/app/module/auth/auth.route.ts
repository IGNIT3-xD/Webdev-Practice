import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidation } from "./auth.validation";

const router = Router();

router.post(
	"/register",
	validateRequest(UserValidation.registerUserValidation),
	AuthController.registerPatient,
);

router.post(
	"/verify-email",
	validateRequest(UserValidation.verifyEmailValidation),
	AuthController.verifyEmail,
);

router.post(
	"/login",
	validateRequest(UserValidation.loginUserValidation),
	AuthController.loginUser,
);

router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/google", AuthController.googleLogin);

router.post(
	"/forget-password",
	validateRequest(UserValidation.forgetPasswordValidation),
	AuthController.forgetPassword,
);

router.post(
	"/reset-password",
	validateRequest(UserValidation.resetPasswordValidation),
	AuthController.resetPassword,
);

export const AuthRoutes = router;
