import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe"
import { buffer } from "micro";
import prisma from "../../helper/prismadb"

export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const my_buffer = await buffer(request);
    const signature = request.headers['stripe-signature'];

    if (!signature) {
        return response.status(400).send("Stripe Signature is empty");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(my_buffer, signature, process.env.STRIPE_WEBHOOK_KEY!)
    } catch (error) {
        return response.status(400).send("Webhook Error" + error);
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge: any = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === 'string') {
                await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: { status: 'complete', address: charge.shipping?.address }
                })
            }

            break

        default:
            console.log("Unknown Event: ", event.type);
    }

    response.json({ received: true })
}