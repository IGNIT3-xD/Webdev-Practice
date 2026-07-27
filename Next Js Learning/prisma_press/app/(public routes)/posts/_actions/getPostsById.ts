'use server'

export const getPostById = async (id: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/api/posts/${id}`, {
        cache: 'force-cache'
    })

    const result = await res.json()

    return result
}