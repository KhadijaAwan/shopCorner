import { getUser } from "@/actions/getLoginUser";
import prisma from "../../../../helper/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const validUser = await getUser();

    if (!validUser) {
        return NextResponse.error();
    }

    if (validUser.role !== "ADMIN") {
        return NextResponse.error();
    }

    const product = await prisma?.product.delete({
        where: { id: params.id }
    })

    return NextResponse.json(product);
}