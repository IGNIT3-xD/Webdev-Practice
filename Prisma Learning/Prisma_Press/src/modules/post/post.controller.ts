import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createPostQuery, deletePostQuery, getMyPostsQuery, getPostByIdQuery, getPostsQuery, postStatsQuery, updatePostQuery } from "./post.services";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from 'http-status';

export const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id
    const payload = req.body

    const result = await createPostQuery(payload, id)

    sendResponse(res, {
        status: httpsStatus.CREATED,
        success: true,
        message: "Post created successfully",
        data: result
    })
})

export const getPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    // console.log(query);
    const result = await getPostsQuery(query)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Post retrieved successfully",
        data: result
    })
})

export const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params
    if (!postId)
        throw new Error("Can't get post")

    const result = await getPostByIdQuery(postId as string)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Post retrieved successfully",
        data: result
    })
})

export const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.user?.id

    const result = await getMyPostsQuery(author_id)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Post retrieved successfully",
        data: result
    })
})

export const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.user?.id
    const { postId } = req.params
    const payload = req.body

    const result = await updatePostQuery(payload, author_id, postId as string)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Post updated successfully",
        data: result
    })
})

export const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.user?.id
    const { postId } = req.params

    const result = await deletePostQuery(author_id, postId as string)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Post deleted successfully",
        data: null
    })
})

export const postStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postStatsQuery()

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Stats retrieved successfully",
        data: result
    })
})