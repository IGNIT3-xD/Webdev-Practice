import { Router } from "express";
import { createPost, deletePost, getMyPosts, getPostById, getPosts, postStats, updatePost } from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const postRouter = Router()

postRouter.post('/', auth(Role.ADMIN, Role.AUTHOR, Role.USER), createPost)
postRouter.get('/', getPosts)
postRouter.get('/my-posts', auth(Role.ADMIN, Role.AUTHOR, Role.USER), getMyPosts)
postRouter.get('/stats', auth(Role.ADMIN), postStats)
postRouter.get('/:postId', getPostById)
postRouter.patch('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), updatePost)
postRouter.delete('/:postId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), deletePost)

export default postRouter