import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";

export const userRoute = Router()

userRoute.post('/', createUser)
userRoute.get('/', getAllUsers)
userRoute.get('/:id', getUserById)
userRoute.put('/:id', updateUser)
userRoute.delete('/:id', deleteUser)