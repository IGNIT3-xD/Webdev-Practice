import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import userRouter from "./app/module/user/user.route";

const app: Application = express();

app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// app.get('/test', async (req: Request, res: Response) => {
// 	try {
// 		await redisClient.set("forget-password-otp:yourmail@mail.com", "123456", {
// 			expiration: {
// 				type: 'EX',
// 				value: 60
// 			}
// 		})

// 		sendResponse(res, {
// 			statusCode: httpStatus.OK,
// 			success: true,
// 			message: "Redis OTP get Successfully",
// 			data: null
// 		});

// 	} catch (error) {
// 		console.log(error);
// 	}
// })

// Working routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", userRouter);

// Basic route
app.get("/", async (_req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Welcome to PH Healthcare System Backend",
	});
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
