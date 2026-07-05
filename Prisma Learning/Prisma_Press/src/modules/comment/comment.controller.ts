import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createCommentQuery, deleteCommentQuery, getCommentByPostQuery, getCommentsQuery, updateCommentQuery } from "./comment.services";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from 'http-status';

export const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const author_id = req.user?.id
    const comment = await createCommentQuery(req.body, author_id)

    sendResponse(res, {
        success: true,
        status: httpsStatus.CREATED,
        message: "Comment created successfully",
        data: comment
    })
})

export const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { author_id } = req.params
    const result = await getCommentsQuery(author_id as string)

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "Comment retrireved successfully",
        data: result
    })
})

export const getCommentsByPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { post_id } = req.params
    const result = await getCommentByPostQuery(post_id as string)

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "Comments retrireved successfully",
        data: result
    })
})

export const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { comment_id } = req.params
    const author_id = req.user?.id

    const result = await updateCommentQuery(req.body, comment_id as string, author_id)

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "Comments updated successfully",
        data: result
    })
})

export const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { comment_id } = req.params
    const author_id = req.user?.id

    const result = await deleteCommentQuery(comment_id as string, author_id)

    sendResponse(res, {
        success: true,
        status: httpsStatus.OK,
        message: "Comments deleted successfully",
        data: null
    })
})
