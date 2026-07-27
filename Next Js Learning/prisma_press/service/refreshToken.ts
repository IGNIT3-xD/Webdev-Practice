'use server'

import { cookies } from "next/headers"

export const getRefreshToken = async () => {
    const cookieStore = await cookies()

    const refreshToken = cookieStore.get('refreshToken')?.value
    if (!refreshToken) {
        return {
            success: false,
            message: 'User not logged in.'
        }
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/auth/refreshToken`, {
        headers: {
            method: "POST",
            Cookie: `refreshToken=${refreshToken}`
        },
        cache: 'no-store'
    })

    const result = await res.json()
    return result
}