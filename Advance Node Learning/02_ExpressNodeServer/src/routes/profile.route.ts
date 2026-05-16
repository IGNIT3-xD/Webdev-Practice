import { Router } from "express";
import { createProfile, deleteProfile, getProfileById, getProfiles, updateProfile } from "../controllers/profile.controller";

export const profileRoute = Router()

profileRoute.post('/', createProfile)
profileRoute.get('/', getProfiles)
profileRoute.get('/:id', getProfileById)
profileRoute.put('/:id', updateProfile)
profileRoute.delete('/:id', deleteProfile)