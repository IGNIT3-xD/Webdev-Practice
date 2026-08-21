import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";

const bookAppointmentService = async () => {
    const bkasIdToken = await getBkashIdToken()
    // console.log(bkasIdToken);

    if (!bkasIdToken) {
        throw new Error("Bkash id token not found.")
    }

    const createPayment = await fetch(`${config.bkash_base_url}/tokenized/checkout/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: bkasIdToken,
            "X-App-Key": config.bkash_app_key
        },
        body: JSON.stringify({
            agreementID: 'TokenizedMerchant01L3IKB6H1565072174986',
            mode: "0011",
            payerReference: "01770618575",
            callbackURL: `${config.backend_url}/api/v1/appointment/book-appointment/payment/callback`,
            merchantAssociationInfo: "MI05MID54RF09123456One",
            amount: "1299",
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "Inv0124"
        })
    })

    const paymentResult = await createPayment.json()
    return paymentResult
}

const createPaymentCallbackService = async (query: Record<string, any>) => {
    const paymentId = query.paymentID
    const status = query.status

    if (!paymentId) {
        throw new Error("Invalid payment id.")
    }

    if (!status) {
        throw new Error("Payment status false.")
    }

    const bkashIdToken = await getBkashIdToken()

    if (!bkashIdToken) {
        throw new Error("Bkash id token not found.")
    }

    const executePayment = await fetch(`${config.bkash_base_url}/tokenized/checkout/execute`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: bkashIdToken,
            "X-App-Key": config.bkash_app_key
        },
        body: JSON.stringify({
            paymentID: paymentId
        })
    })

    const executePaymentResult = await executePayment.json()

    if (status === 'success') {
        return {
            executePaymentResult,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=success`
        }
    }

    if (status === 'failure') {
        return {
            executePaymentResult,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=failure`
        }
    }

    if (status === 'cancel') {
        return {
            executePaymentResult,
            redirectUrl: `${config.frontend_url}/dashboard/my-appointments?status=cancel`
        }
    }

    return {
        executePaymentResult,
        redirectUrl: `${config.frontend_url}/dashboard/my-appointments`
    }
}

export const AppointmentService = {
    bookAppointmentService,
    createPaymentCallbackService
};