import { Router } from "express";
import { loginUser, refreshToken } from "./auth.controller";

const authRouter = Router()

authRouter.post('/login', loginUser)
authRouter.post('/refresh-token', refreshToken)

export default authRouter