import { getUser } from "@/actions/getLoginUser";
import prisma from "../../../helper/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const validUser = await getUser();

        if (!validUser) {
            return NextResponse.error();
        }

        if (validUser.role !== "ADMIN") {
            return NextResponse.error();
        }

        const body = await request.json();
        console.log("product api ", body);

        const { name, description, price, rating, brand, category, inStock, photo } = body;
        if (!name || !description || !price || !rating || !brand || !category || !inStock || !photo) {
            return NextResponse.error();
        }

        const product = await prisma.product.create({
            data: { name, description, price, rating, brand, category, inStock, photo },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error in Product Add request:", error);
        return NextResponse.error();
    }
}


export async function PUT(request: Request) {
    const validUser = await getUser();

    if (!validUser) {
        return NextResponse.error();
    }

    if (validUser.role !== "ADMIN") {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, inStock } = body;

    const product = await prisma.product.update({
        where: { id: id },
        data: { inStock }
    })

    return NextResponse.json(product);
}