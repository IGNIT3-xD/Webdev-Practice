import { title } from "node:process";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import type { IPost, IUpdatePost } from "./post.interface";

export const createPostQuery = async (payload: IPost, user_id: string) => {
    const post = await prisma.post.create({
        data: {
            ...payload,
            author_id: user_id
        }
    })

    return post
}

export const getPostsQuery = async (query: any) => {
    const limit = query.limit ? Number(query.limit) : 3
    const page = query.page ? Number(query.page) : 1
    const skip = (page - 1) * limit
    const sortBy = query.sortBy ? query.sortBy : "created_at"
    const sortOrder = query.sortOrder ? query.sortOrder : "desc"

    const post = await prisma.post.findMany({
        where: {
            AND: [
                query.search ? {
                    OR: [
                        { title: { contains: query.search, mode: 'insensitive' } },
                        { content: { contains: query.search, mode: 'insensitive' } }
                    ]
                } : {},
                query.title ? { title: query.title } : {},
                query.content ? { content: query.content } : {},
                query.status ? { status: query.status } : {},
                query.tags ? {
                    tags: {
                        hasSome: JSON.parse(query.tags)
                    }
                } : {}
            ]
        },

        take: limit,
        skip: skip,

        orderBy: {
            [sortBy]: sortOrder
        },

        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return post
}

export const getPostByIdQuery = async (post_id: string) => {
    // await prisma.post.update({
    //     where: {
    //         id: post_id
    //     },
    //     data: {
    //         viwes: {
    //             increment: 1
    //         }
    //     }
    // })

    // throw new Error("Fake error !!!")

    // const post = await prisma.post.findUniqueOrThrow({
    //     where: {
    //         id: post_id
    //     },
    //     include: {
    //         author: {
    //             omit: {
    //                 password: true,
    //                 role: true
    //             }
    //         },
    //         comments: {
    //             where: {
    //                 status: CommentStatus.APPROVED
    //             },
    //             orderBy: {
    //                 created_at: "desc"
    //             }
    //         },
    //         _count: {
    //             select: {
    //                 comments: true
    //             }
    //         }
    //     }
    // })

    // return post

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: post_id,
                },
                data: {
                    viwes: {
                        increment: 1
                    },
                }
            });
            // throw new Error("fake error")
            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: post_id,
                },

                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },

                    comments: {
                        where: {
                            status: CommentStatus.APPROVED
                        },

                        orderBy: {
                            created_at: "desc"
                        }
                    },

                    _count: {
                        select: {
                            comments: true
                        }
                    }
                }
            });
            return post
        }
    );

    return transactionResult
}

export const getMyPostsQuery = async (author_id: string) => {
    const post = await prisma.post.findMany({
        where: {
            author_id: author_id
        },
        orderBy: {
            created_at: "desc"
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })

    return post
}

export const updatePostQuery = async (payload: IUpdatePost, author_id: string, post_id: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: post_id
        }
    })

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: author_id
        }
    })

    if (user.role !== 'ADMIN' && post.author_id !== author_id)
        throw new Error("Unauthorize access")

    const result = await prisma.post.update({
        where: {
            id: post_id
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return result
}

export const deletePostQuery = async (author_id: string, post_id: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: post_id
        }
    })

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: author_id
        }
    })

    if (user.role !== 'ADMIN' && post.author_id !== author_id)
        throw new Error("Unauthorize access")

    await prisma.post.delete({
        where: {
            id: post_id
        }
    })

    return null
}

export const postStatsQuery = async () => {
    const transactionResult = await prisma.$transaction(
        async (tx) => {
            const [
                totalPosts,
                totalPublished,
                totalDraft,
                totalArcheive,
                totalComments,
                totalApprove,
                totalRejected,
                totalPostViewsAgg
            ] = await Promise.all([
                await tx.post.count(),

                await tx.post.count({
                    where: { status: PostStatus.PUBLISHED }
                }),

                await tx.post.count({
                    where: { status: PostStatus.Draft }
                }),

                await tx.post.count({
                    where: { status: PostStatus.ARCHEIVE }
                }),

                await tx.comment.count(),

                await tx.comment.count({
                    where: { status: CommentStatus.APPROVED }
                }),

                await tx.comment.count({
                    where: { status: CommentStatus.REJECTED }
                }),

                await tx.post.aggregate({
                    _sum: {
                        viwes: true
                    }
                })
            ]);

            return {
                totalPosts,
                totalPublished,
                totalDraft,
                totalArcheive,
                totalComments,
                totalApprove,
                totalRejected,
                totalPostViews: totalPostViewsAgg._sum.viwes
            }
        }
    )

    return transactionResult
} 