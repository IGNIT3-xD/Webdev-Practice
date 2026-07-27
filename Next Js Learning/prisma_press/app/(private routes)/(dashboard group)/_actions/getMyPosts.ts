'use server'

import { cookies } from 'next/headers';

export const getMyPost = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
        return {
            success: false,
            message: 'User not logged in.'
        }
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/posts/my-posts`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        cache: 'force-cache'
    })

    const result = await res.json()
    return result
}

type PostState = {
    success: true,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>
}

export const createPost = async (prevState: PostState, formData: FormData) => {
    const title = formData.get('title')
    const content = formData.get('content')
    const thumnbnail = formData.get('thumnbnail')
    const tags = (formData.get('tags') as string).split(", ")

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
        return {
            success: false,
            message: 'User not logged in.'
        }
    }

    const payload = { title, content, thumnbnail, tags }
    console.log(payload);

    const res = await fetch(`${process.env.BACKEND_API}/api/posts`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Cookie: `accessToken=${accessToken}`
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        return {
            success: false,
            message: errorBody?.message || 'Failed to create post.'
        }
    }

    const result = await res.json()

    return result
}