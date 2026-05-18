import { Router } from "express";
import { login, refreshToken } from "../controllers/auth.controller";

export const authRoute = Router()

authRoute.post('/login', login)
authRoute.post('/refresh-token', refreshToken)