import bcrypt from "bcryptjs";
import type { JwtPayload, SignOptions } from "jsonwebtoken";
import {
	AuthProvider,
	Role,
	UserStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import type {
	IForgetPassEmail,
	IGooleLoginPayload,
	ILoginUserPayload,
	IRegisterPatientPayload,
	IRequestUser,
	IResetPassword,
	IVerifyEmailPayload,
} from "./auth.interface";
import googleClient from "../../lib/googleLogin";
import type { TokenPayload } from "google-auth-library";
import crypto from "crypto";
import { redisClient } from "../../lib/redis";
import { transporter } from "../../lib/nodemailer";
import ejs from "ejs";
import path from "path";

const registerPatient = async (payload: IRegisterPatientPayload) => {
	const { name, password, email, patient: patientData } = payload;
	// const email = payload.email.trim().toLowerCase();

	const isUserExists = await prisma.user.findUnique({
		where: { email },
	});

	if (isUserExists) {
		throw new Error("User with this email already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 8);

	// Reserve un-verfied user to redis
	const expirationTime = 5 * 60;

	const otp = crypto.randomInt(100000, 1000000).toString();
	const otpKey = `registration-otp:${email}`;

	await redisClient.set(otpKey, otp, {
		expiration: {
			type: "EX",
			value: expirationTime,
		},
	});

	const redisPayload = {
		name,
		email,
		password: hashedPassword,
		patient: patientData,
	};
	const payloadKey = `register-user-data:${email}`;

	await redisClient.set(payloadKey, JSON.stringify(redisPayload), {
		expiration: {
			type: "EX",
			value: expirationTime,
		},
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/register-user-otp.ejs",
	);
	const html = await ejs.renderFile(templatePath, {
		userName: name,
		otp,
		expirationTime: expirationTime / 60,
	});

	await transporter.sendMail({
		from: config.smtp_email_sender,
		to: email,
		subject: "Verfify Your Account",
		html,
	});

	// const createdUser = await prisma.user.create({
	// 	data: {
	// 		name,
	// 		email,
	// 		password: hashedPassword,
	// 		role: Role.PATIENT,
	// 		status: UserStatus.ACTIVE,
	// 		emailVerified: false,
	// 		patient: {
	// 			create: {
	// 				name,
	// 				email,
	// 				contactNumber: patientData?.contactNumber,
	// 				address: patientData?.address,
	// 			},
	// 		},
	// 	},
	// 	omit: { password: true },
	// 	include: { patient: true },
	// });

	// const { patient, ...user } = createdUser;

	// const jwtPayload = {
	// 	userId: user.id,
	// 	name: user.name,
	// 	email: user.email,
	// 	role: user.role,
	// };

	// const accessToken = jwtUtils.createToken(
	// 	jwtPayload,
	// 	config.jwt_access_secret,
	// 	config.jwt_access_expires_in as SignOptions,
	// );

	// const refreshToken = jwtUtils.createToken(
	// 	jwtPayload,
	// 	config.jwt_refresh_secret,
	// 	config.jwt_refresh_expires_in as SignOptions,
	// );

	// return {
	// 	user,
	// 	patient,
	// 	accessToken,
	// 	refreshToken,
	// };
};

const verifyEmailService = async (payload: IVerifyEmailPayload) => {
	const isExist = await prisma.user.findUnique({
		where: { email: payload.email },
	});

	if (isExist?.status === UserStatus.BLOCKED) {
		throw new Error("User is blocked");
	}

	if (isExist?.isDeleted || isExist?.status === UserStatus.DELETED) {
		throw new Error("User is deleted");
	}

	if (isExist?.emailVerified) {
		throw new Error("Email is already verified.");
	}

	const otpKey = `registration-otp:${payload.email}`;
	const redisOtp = await redisClient.get(otpKey);

	if (!redisOtp) {
		throw new Error("No OTP found");
	}

	if (redisOtp !== payload.otp) {
		throw new Error("Invalid OTP !!!");
	}

	// If OTP verfied successfully
	await redisClient.del([otpKey]);

	const payloadKey = `register-user-data:${payload.email}`;
	const redisUserData = await redisClient.get(payloadKey);

	if (!redisUserData) {
		throw new Error("User data not found.");
	}

	const userData: IRegisterPatientPayload = JSON.parse(redisUserData);

	const createdUser = await prisma.user.create({
		data: {
			name: userData.name,
			email: userData.email,
			password: userData.password,
			role: Role.PATIENT,
			status: UserStatus.ACTIVE,
			emailVerified: true,
			patient: {
				create: {
					name: userData.name,
					email: userData.email,
					contactNumber: userData.patient?.contactNumber,
					address: userData.patient?.address,
				},
			},
		},
		omit: { password: true },
		include: { patient: true },
	});

	const { patient, ...user } = createdUser;

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	await redisClient.del([payloadKey]);

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/welcome.ejs",
	);
	const welcomeBody = await ejs.renderFile(templatePath, {
		name: user.name,
	});

	await transporter.sendMail({
		from: config.smtp_email_sender,
		to: user.email,
		subject: "Welcome To PH-Healthcare",
		html: welcomeBody,
	});

	return {
		user,
		patient,
		accessToken,
		refreshToken,
	};
};

const loginUser = async (payload: ILoginUserPayload) => {
	const { password } = payload;
	const email = payload.email.trim().toLowerCase();

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new Error("User not found");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new Error("User is blocked");
	}

	if (user.isDeleted || user.status === UserStatus.DELETED) {
		throw new Error("User is deleted");
	}

	if (user.password === null && user.googleId !== null) {
		throw new Error("User is already registered with Google.");
	}

	const isPasswordMatched = await bcrypt.compare(
		password,
		user.password as string,
	);

	if (!isPasswordMatched) {
		throw new Error("Invalid credentials");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const getMe = async (user: IRequestUser) => {
	const isUserExists = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			patient: true,
		},
		omit: {
			password: true,
		},
	});

	if (!isUserExists) {
		throw new Error("User not found");
	}

	return isUserExists;
};

const refreshToken = async (token: string) => {
	const verifiedRefreshToken = jwtUtils.verifyToken(
		token,
		config.jwt_refresh_secret,
	);

	if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
		throw new Error(
			config.node_env === "development"
				? verifiedRefreshToken.error
				: "Invalid refresh token",
		);
	}

	const data = verifiedRefreshToken.data as JwtPayload;

	const user = await prisma.user.findUnique({
		where: { id: data.userId },
	});

	if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
		throw new Error("User is inactive or not found");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const googleLoginService = async (payload: IGooleLoginPayload) => {
	let googleIdTokenPayload: TokenPayload | null | undefined = null;

	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: payload.idToken,
			audience: config.google_client_id,
		});

		googleIdTokenPayload = ticket.getPayload();
	} catch (error) {
		console.log("Google ID TOken Varifiation failed", error);
		throw new Error("Invalid or Expired ID Token");
	}

	if (!googleIdTokenPayload) {
		throw new Error("Invalid or Expired ID Token");
	}

	if (!googleIdTokenPayload.email || !googleIdTokenPayload.name) {
		throw new Error("Gmail or User not found.");
	}

	const patientWithGoogle = await prisma.user.findUnique({
		where: {
			email: googleIdTokenPayload.email,
			role: Role.PATIENT,
			googleId: googleIdTokenPayload.sub,
		},
	});

	let user = patientWithGoogle;

	if (!user) {
		const isExistWithCredentials = await prisma.user.findUnique({
			where: {
				email: googleIdTokenPayload.email,
				role: Role.PATIENT,
				authProvider: AuthProvider.GOOGLE,
			},
		});

		if (isExistWithCredentials) {
			if (
				isExistWithCredentials.status === UserStatus.BLOCKED ||
				isExistWithCredentials.isDeleted ||
				isExistWithCredentials.status === "DELETED"
			) {
				throw new Error("User is Blocked or Deleted");
			}

			if (!isExistWithCredentials.emailVerified) {
				throw new Error("User Email is not verified");
			}

			user = await prisma.user.update({
				where: {
					id: isExistWithCredentials.id,
				},
				data: {
					googleId: googleIdTokenPayload.sub,
				},
			});
		} else {
			user = await prisma.user.create({
				data: {
					name: googleIdTokenPayload.name,
					email: googleIdTokenPayload.email,
					role: Role.PATIENT,
					googleId: googleIdTokenPayload.sub,
					authProvider: AuthProvider.GOOGLE,
					emailVerified: true,
					patient: {
						create: {
							name: googleIdTokenPayload.name,
							email: googleIdTokenPayload.email,
						},
					},
				},
			});
		}
	}

	if (
		user.status === UserStatus.BLOCKED ||
		user.isDeleted ||
		user.status === "DELETED"
	) {
		throw new Error("User is Blocked or Deleted");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const forgetPasswordService = async (payload: IForgetPassEmail) => {
	const { email } = payload;

	const isExist = await prisma.user.findUnique({
		where: { email },
	});

	if (!isExist) {
		throw new Error("User not found");
	}

	if (isExist.status === "BLOCKED" || isExist.status === "DELETED") {
		throw new Error("User is blocked or deleted.");
	}

	if (isExist.authProvider !== "CREDENTIAL") {
		throw new Error("User has an account with Google.");
	}

	const otp = crypto.randomInt(100000, 1000000).toString();
	const key = `forget-password-otp:${isExist.email}`;

	await redisClient.set(key, otp, {
		expiration: {
			type: "EX",
			value: 5 * 60,
		},
	});

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/forget-password.ejs",
	);

	const htmlBody = await ejs.renderFile(templatePath, {
		userName: isExist.name,
		otp,
		expirationTime: (5 * 60) / 60,
	});

	await transporter.sendMail({
		from: config.smtp_email_sender,
		to: isExist.email,
		subject: "Forget Password",
		html: htmlBody,
	});
};

const resetPasswordService = async (payload: IResetPassword) => {
	const { email, otp, newPassword } = payload;

	const isExist = await prisma.user.findUnique({
		where: { email },
	});

	if (!isExist) {
		throw new Error("User not found");
	}

	if (isExist.status === "BLOCKED" || isExist.status === "DELETED") {
		throw new Error("User is blocked or deleted.");
	}

	if (isExist.authProvider !== "CREDENTIAL") {
		throw new Error("User has an account with Google.");
	}

	const key = `forget-password-otp:${isExist.email}`;
	const redisOtp = await redisClient.get(key);

	if (!redisOtp) {
		throw new Error("OTP not exist.");
	}

	if (redisOtp !== otp) {
		throw new Error("OTP didn't matched.");
	}

	const hashedNewPassword = await bcrypt.hash(newPassword, 8);

	await prisma.user.update({
		where: { email },
		data: {
			password: hashedNewPassword,
		},
	});

	await redisClient.del([key]);

	const templatePath = path.join(
		process.cwd(),
		"src/app/templates/reset-password-success.ejs",
	);

	const html = await ejs.renderFile(templatePath, {
		userName: isExist.name,
	});

	await transporter.sendMail({
		from: config.smtp_email_sender,
		to: isExist.email,
		subject: "Your Password Has Been Changed Successfully!",
		html,
	});
};

export const AuthService = {
	registerPatient,
	verifyEmailService,
	loginUser,
	getMe,
	refreshToken,
	googleLoginService,
	forgetPasswordService,
	resetPasswordService,
};
