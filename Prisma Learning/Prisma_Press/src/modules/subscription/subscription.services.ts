import config from "../../config"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"
import type Stripe from "stripe"

import { handleChangedSubscription, handleCheckoutSessionCompleted } from "./subsUtils"

export const createCheckoutSessionQuery = async (user_id: string) => {
    const transectionResult = await prisma.$transaction(
        async (tx) => {
            const user = await tx.user.findUniqueOrThrow({
                where: { id: user_id },
                include: { subscription: true }
            })

            // Old subscriber
            let stripeCustomerId = user.subscription?.stripeCustomerId

            // New subsriber
            if (!stripeCustomerId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    metadata: {
                        user_id: user.id
                    }
                })

                stripeCustomerId = customer.id
            }

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: config.STRIPE_PRICE_ID,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                customer: stripeCustomerId,
                payment_method_types: ['card'],
                success_url: `${config.APP_URL}/premium?success=true`,
                cancel_url: `${config.APP_URL}/premium?success=false`,
                metadata: { user_id: user_id }
            })

            return session.url
        }
    )

    return {
        paymentUrl: transectionResult
    }
}

export const webhookQuery = async (payload: Buffer, signature: string) => {
    const endpointSecret = config.WEHBHOOK_SECRET

    const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
    );

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            // console.log(event.data.object);
            await handleCheckoutSessionCompleted(event.data.object)
            break;

        case 'customer.subscription.updated':
            await handleChangedSubscription(event.data.object)
            break;

        case 'customer.subscription.deleted':
            await handleChangedSubscription(event.data.object)
            break;

        default:
            console.log(`Unhandled event type ${event.type}.`);
            break;
    }
}

export const cancelSubscriptionQuery = async (subscription_id: string) => {
    const cancelled = await stripe.subscriptions.cancel(subscription_id)
    return cancelled
}