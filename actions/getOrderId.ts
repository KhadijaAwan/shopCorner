import prisma from "../helper/prismadb"

interface OrderParams {
    orderId?: string;
}

export default async function getOrdersId(params: OrderParams) {
    try {
        const { orderId } = params;
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        })

        if (!order)
            return null;

        return order;
    }
    catch (error: any) {
        throw new Error(error);
    }
}