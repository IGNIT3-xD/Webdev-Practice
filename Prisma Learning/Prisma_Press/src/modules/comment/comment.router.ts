import { Router } from "express";
import { createComment, deleteComment, getCommentsByAuthorId, getCommentsByPost, updateComment } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const commentRouter = Router()

commentRouter.post('/', auth(Role.ADMIN, Role.AUTHOR, Role.USER), createComment)
commentRouter.get('/author/:author_id', getCommentsByAuthorId)
commentRouter.get('/:post_id', getCommentsByPost)
commentRouter.patch('/:comment_id', auth(Role.ADMIN, Role.AUTHOR, Role.USER), updateComment)
commentRouter.delete('/:comment_id', auth(Role.ADMIN, Role.AUTHOR, Role.USER), deleteComment)

export default commentRouter