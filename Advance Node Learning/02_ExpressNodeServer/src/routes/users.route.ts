import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";
import { auth } from './../middleware/auth';

export const userRoute = Router()

userRoute.post('/', createUser)
userRoute.get('/', auth("Admin", "Modaretor"), getAllUsers)
userRoute.get('/:id', getUserById)
userRoute.put('/:id', updateUser)
userRoute.delete('/:id', deleteUser)