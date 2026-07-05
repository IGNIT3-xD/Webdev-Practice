import { prisma } from "../../lib/prisma"
import type { IComment } from "./comment.interface"

export const createCommentQuery = async (payload: IComment, author_id: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.post_id
        }
    })

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            author_id
        }
    })

    return comment
}

export const getCommentsQuery = async (author_id: string) => {
    const commentsMadeByUser = await prisma.comment.findMany({
        where: {
            author_id
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

    return commentsMadeByUser
}

export const getCommentByPostQuery = async (post_id: string) => {
    const comment = await prisma.comment.findMany({
        where: {
            post_id
        }
    })

    return comment
}

export const updateCommentQuery = async (payload: IComment, comment_id: string, author_id: string) => {
    await prisma.comment.findUniqueOrThrow({
        where: {
            id: comment_id,
            author_id
        }
    })

    const comment = await prisma.comment.update({
        where: {
            id: comment_id,
            author_id
        },
        data: payload
    })

    return comment
}

export const deleteCommentQuery = async (comment_id: string, author_id: string) => {
    await prisma.comment.findUniqueOrThrow({
        where: {
            id: comment_id,
            author_id
        }
    })

    const comment = await prisma.comment.delete({
        where: {
            id: comment_id
        }
    })

    return comment
}