import Stripe from "stripe";
import prisma from "../../../helper/prismadb"
import { NextResponse } from "next/server";
import { ProductCart } from "@/app/components/product/productInfo";
import { getUser } from "@/actions/getLoginUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
})

const totalAmount = (items: ProductCart[]) => {
    const totalPrice = items.reduce((accumulator, item) => {
        const eachProductTotal = item.price * item.quantity;
        return accumulator + eachProductTotal;
    }, 0);

    return totalPrice;
}

export async function POST(request: Request) {
    const validUser = await getUser();

    if (!validUser) {
        return NextResponse.error();
    }

    else {
        const body = await request.json();
        const { items, payment_intent_id } = body;
        const total = totalAmount(items);
        const orderInfo = {
            user: { connect: { id: validUser.id } },
            amount: total,
            currency: "usd",
            status: "complete",
            deliveryStatus: "pending",
            paymentIntentId: payment_intent_id,
            products: items,
        }

        if (payment_intent_id) {
            const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

            if (currentIntent) {
                const updateIntent = await stripe.paymentIntents.update(payment_intent_id, {
                    amount: total
                })

                const [existing_order, update_order] = await Promise.all([
                    prisma.order.findFirst({
                        where: { paymentIntentId: payment_intent_id }
                    }),
                    prisma.order.update({
                        where: { paymentIntentId: payment_intent_id },
                        data: {
                            amount: total,
                            products: items,
                        },
                    })
                ])

                if (!existing_order) {
                    return NextResponse.error();
                }

                return NextResponse.json({ paymentIntent: updateIntent });
            }
        }
        else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
                automatic_payment_methods: { enabled: true },
            })

            orderInfo.paymentIntentId = paymentIntent.id;
            await prisma.order.create({
                data: orderInfo,
            })

            return NextResponse.json({ paymentIntent });
        }

        return NextResponse.error();
    }
}