import prisma from "../helper/prismadb"

interface viewProduct {
    productId?: string;
}

export default async function getProductId(params: viewProduct) {
    try {
        const { productId } = params;

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product)
            return null;

        return product;
    }
    catch (error: any) {
        throw new Error(error);
    }
}