import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { cancelSubscriptionQuery, createCheckoutSessionQuery, webhookQuery } from "./subscription.services";
import { sendResponse } from "../../utils/sendResponse";
import httpsStatus from 'http-status';

export const createCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user?.id
    const result = await createCheckoutSessionQuery(user_id)

    sendResponse(res, {
        status: httpsStatus.OK,
        success: true,
        message: "Checkout completed successfully",
        data: result
    })
})

export const webhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body
    const signature = req.headers['stripe-signature'] as string

    await webhookQuery(event, signature)

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Webhook triggered successfully",
        data: null
    })
})

export const cancelSubscription = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { subscription_id } = req.body
    const result = await cancelSubscriptionQuery(subscription_id as string)
    sendResponse(res, {
        status: 200,
        success: true,
        message: "Subscription cancelled successfully",
        data: result
    })
})