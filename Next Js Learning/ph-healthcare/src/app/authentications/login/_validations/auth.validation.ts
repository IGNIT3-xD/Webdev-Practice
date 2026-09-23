import z from "zod";

export const loginUserValidation = z.object({
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
