import type { Request, Response } from 'express'
import { createProfileQuery, deleteProfileQuery, getProfileByIdQuery, getProfilesQuery, updateProfileQuery } from '../services/profile.service'

export const createProfile = async (req: Request, res: Response) => {
    const { user_id, bio, address, phone, gender } = req.body

    try {
        const profile = await createProfileQuery(user_id, bio, address, phone, gender)
        // console.log(profile);
        res.status(201).json({ success: true, message: "Profile created successfully", data: profile })
    }
    catch (err: any) {
        if (err.message === "User does not exist")
            return res.status(404).json({ success: false, message: err.message })

        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const getProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await getProfilesQuery()
        res.status(200).json({ success: true, message: "Profiles retrieved successfully", data: profiles })

    } catch (err: any) {
        res.status(404).json({ success: false, message: err.message, error: err })
    }
}

export const getProfileById = async (req: Request, res: Response) => {
    const id = req.params.id as string

    try {
        const profile = await getProfileByIdQuery(id)

        if (!profile)
            return res.status(404).json({ success: false, message: "Profile not found" })

        res.status(200).json({ success: true, message: "Profile retrieved successfully", data: profile })

    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const { bio, address, phone } = req.body

    try {
        const profile = await updateProfileQuery(bio, address, phone, id)

        if (!profile)
            return res.status(404).json({ success: false, message: "Profile not found" })

        res.status(200).json({ success: true, message: "Profile updated successfully", data: profile })

    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const deleteProfile = async (req: Request, res: Response) => {
    const id = req.params.id as string

    try {
        const profile = await deleteProfileQuery(id)

        if (!profile)
            return res.status(404).json({ success: false, message: "Profile not found" })

        res.status(202).json({ success: true, message: "Profile deleted successfully", data: null })

    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}