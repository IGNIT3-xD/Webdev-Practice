'use server'

export const getPosts = async ({ query, }: { query?: { [key: string]: string | string[] | undefined } }) => {
    const params = new URLSearchParams()
    if (query && query.search) {
        params.set('search', query.search as string)
    }

    const res = await fetch(`${process.env.BACKEND_API}/api/posts?${params.toString()}`, {
        cache: 'force-cache'
    })

    const result = await res.json()

    return result
}