import z from "zod";

const registerUserValidation = z.object({
	name: z
		.string("Name must me string")
		.min(2, "Name must be at least 2 characters long.")
		.max(20, "Name is too long."),
	email: z.email("Please, enter an email"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long.")
		.max(30, "Password is too long")
		.regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
		.regex(/[A-Z]/, "Password must contain at least 1 upper case letter.")
		.regex(/[0-9]/, "Password must contain at least 1 number.")
		.regex(
			/[^A-Za-z0-9\s]/,
			"Password must contain at least 1 special character.",
		),
	patient: z
		.object({
			contactNumber: z.string("Contact no. must be string").optional(),
			address: z.string().optional(),
		})
		.optional(),
});

const loginUserValidation = z.object({
	email: z.email("Please, enter an email"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long.")
		.max(30, "Password is too long")
		.regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
		.regex(/[A-Z]/, "Password must contain at least 1 upper case letter.")
		.regex(/[0-9]/, "Password must contain at least 1 number.")
		.regex(
			/[^A-Za-z0-9\s]/,
			"Password must contain at least 1 special character.",
		),
});

const forgetPasswordValidation = z.object({
	email: z.email("Please, enter an valid email"),
});

const resetPasswordValidation = z.object({
	email: z.email("Please, enter an valid email"),
	otp: z.string().length(6, "OTP must be 6 numbers"),
	newPassword: z
		.string()
		.min(6, "Password must be at least 6 characters long.")
		.max(30, "Password is too long")
		.regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
		.regex(/[A-Z]/, "Password must contain at least 1 upper case letter.")
		.regex(/[0-9]/, "Password must contain at least 1 number.")
		.regex(
			/[^A-Za-z0-9\s]/,
			"Password must contain at least 1 special character.",
		),
});

export const UserValidation = {
	registerUserValidation,
	loginUserValidation,
	forgetPasswordValidation,
	resetPasswordValidation,
};
