import { Router } from "express";
import { cancelSubscription, createCheckoutSession, webhook } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const subscriptionRouter = Router()

subscriptionRouter.post('/checkout', auth(Role.ADMIN, Role.AUTHOR, Role.USER), createCheckoutSession)
subscriptionRouter.post('/webhook', webhook)
subscriptionRouter.post('/cancel-subscriptions', auth(Role.ADMIN, Role.AUTHOR, Role.USER), cancelSubscription)

export default subscriptionRouter