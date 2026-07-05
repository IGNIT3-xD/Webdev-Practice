import { Router } from "express";
import { createUser, myProfile, updateProfile } from "./user.controller";
import { auth } from './../../middlewares/auth';
import { Role } from "../../../generated/prisma/enums";

const userRouter = Router()

userRouter.post('/register', createUser)
userRouter.get('/me', auth(Role.ADMIN, Role.USER), myProfile)
userRouter.put('/my-profile', auth(Role.ADMIN, Role.USER), updateProfile)

export default userRouter