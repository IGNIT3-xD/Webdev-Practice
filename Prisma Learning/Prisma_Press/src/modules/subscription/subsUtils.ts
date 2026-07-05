import type Stripe from "stripe"
import { SubscriptionStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { stripe } from "../../lib/stripe"

export const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
    // const session: Stripe.Checkout.Session = session
    const user_id = session.metadata?.user_id as string
    const stripeCustomer_id = session.customer as string
    const subscription_id = session.subscription as string

    if (!user_id || !stripeCustomer_id || !subscription_id) {
        console.log('Webhook failed')
        return
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(subscription_id as string)
    // console.log(stripeSubscription);
    const currentPeriodEndMili = stripeSubscription.items.data[0]?.current_period_end!
    const currentPeriodEnd = new Date(currentPeriodEndMili * 1000)

    await prisma.subscription.upsert({
        where: {
            user_id: user_id
        },
        create: {
            user_id,
            stripeCustomerId: stripeCustomer_id,
            stripeSubscriptionId: subscription_id,
            subscrition_end: currentPeriodEnd
        },
        update: {
            stripeCustomerId: stripeCustomer_id,
            stripeSubscriptionId: subscription_id,
            subscrition_end: currentPeriodEnd
        }
    })
}

export const handleChangedSubscription = async (subscription: Stripe.Subscription) => {
    const subscription_id = subscription.id
    const subsStatus = subscription.status
    const status = (subsStatus === 'active' || subsStatus === 'trialing') ? SubscriptionStatus.ACTIVE :
        subsStatus === 'canceled' ? SubscriptionStatus.CANCELED :
            SubscriptionStatus.EXPIRED

    const stripeSubscription = await stripe.subscriptions.retrieve(subscription_id as string)
    const currentPeriodEndMili = stripeSubscription.items.data[0]?.current_period_end!
    const currentPeriodEnd = new Date(currentPeriodEndMili * 1000)

    const isSubscriptionExist = await prisma.subscription.findUnique({
        where: {
            stripeSubscriptionId: subscription_id
        }
    })

    if (!isSubscriptionExist) {
        console.log('No subscription found')
        return
    }

    await prisma.subscription.update({
        where: {
            stripeSubscriptionId: subscription_id
        },
        data: {
            status,
            subscrition_end: currentPeriodEnd
        }
    })

}