import { getUser } from "@/actions/getLoginUser";
import prisma from "../../../helper/prismadb"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
    const validUser = await getUser();

    if (!validUser) {
        return NextResponse.error();
    }

    if (validUser.role !== "ADMIN") {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, deliveryStatus } = body;

    const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus }
    })

    return NextResponse.json(order);
}