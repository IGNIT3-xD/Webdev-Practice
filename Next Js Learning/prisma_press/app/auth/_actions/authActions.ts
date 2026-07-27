'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken'

type LoginState = {
    success: true,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const loginAction = async (prevSatate: LoginState, formData: FormData) => {
    // console.log(formData)
    const email = formData.get("email")
    const password = formData.get("password")
    // console.log(email, password);

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json()

    if (result.success) {
        const cookiesStore = await cookies()

        cookiesStore.set('accessToken', result.data.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        })

        cookiesStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload
        // console.log(decodedToken)

        if (decodedToken.role === 'USER') {
            redirect('/dashboard', 'replace')
        }
        else if (decodedToken.role === 'ADMIN') {
            redirect('/admin-dashboard', 'replace')
        }
        else if (decodedToken.role === 'AUTHOR') {
            redirect('/author-dashboard', 'replace')
        }
        else {
            redirect('/', 'replace')
        }

    }

    // console.log(result);
    return result
}