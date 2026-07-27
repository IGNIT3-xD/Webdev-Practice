export type IPosts = {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    is_featured: boolean,
    is_premium: boolean,
    status: string,
    tags: string[],
    viwes: number,
    author_id: string,
    created_at: string,
    updated_at: string,
    author: {
        id: string,
        email: string,
        active_status: string,
        role: string,
        created_at: string,
        updated_at: string
    },
    comments?: []
}

type UserData = {
    success: boolean,
    message: string,
    data: {
        email: string,
        active_status: string,
        role: string
        created_at: string
    }
}

export type NavbarProps = {
    user: UserData
}