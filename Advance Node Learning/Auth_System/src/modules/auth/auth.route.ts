import { Router, type Request, type Response } from "express";
import { allUsers, loginUser, regUser } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { allUsersQuery } from "./auth.service";

const router = Router()

router.post('/register', regUser)
router.post('/login', loginUser)
router.get('/all-users', auth, allUsers)

export default router;