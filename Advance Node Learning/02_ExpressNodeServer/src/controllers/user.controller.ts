import type { Request, Response } from 'express'
import { createUserQuery, deleteUserQuery, getAllUsersQuery, getUserByIdQuery, updateUserQuery } from '../services/user.service'

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, age, role } = req.body

    if (!email)
        return res.status(400).json({ success: false, message: "Email is required" })

    try {
        const user = await createUserQuery(name, email, password, age, role)
        res.status(201).json({ success: true, message: "User Created Successfully", data: user })
    }
    catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersQuery()
        res.status(200).json({ success: true, message: "Users retrieved successfully", data: users })
    }
    catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string)

    if (isNaN(id))
        return res.status(400).json({ success: false, message: "Invalid ID" })

    try {
        const user = await getUserByIdQuery(id)

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" })

        res.status(200).json({ success: true, message: "User retrieved successfully", data: user })
    }
    catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string)
    const { name, age, password, is_active, role } = req.body

    try {
        const user = await updateUserQuery(id, name, age, password, is_active, role)

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" })

        res.status(200).json({ success: true, message: "Users updated successfully", data: user })
    }
    catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = (req.params.id as string)

    try {
        const user = await deleteUserQuery(id)

        if (!user)
            return res.status(404).json({ success: false, message: "User not found" })

        res.status(200).json({ success: true, message: "Users deleted successfully", data: null })
    }
    catch (err: any) {
        res.status(500).json({ success: false, message: err.message, error: err })
    }
}