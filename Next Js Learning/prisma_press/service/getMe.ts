'use server'

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value
    if (!accessToken) {
        return {
            success: false,
            message: 'User not logged in.'
        }
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/user/me`, {
        headers: {
            // Authorization: accessToken
            Cookie: `accessToken=${accessToken}`
        }
    })

    const result = await res.json()
    return result
}