import prisma from "../helper/prismadb"

export interface productParams {
    category?: string | null;
    searchProduct?: string | null;
}

export default async function getProducts(params: productParams) {
    try {
        const { category, searchProduct } = params;
        let searchItem = searchProduct;

        if (!searchProduct) {
            searchItem = "";
        }

        let query: any = {}

        if (category) {
            query.category = category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchItem,
                            mode: 'insensitive',
                        },
                        description: {
                            contains: searchItem,
                            mode: 'insensitive',
                        }
                    }
                ]
            }
        })

        return products;
    } catch (error) {
        console.log(error);
    }
}