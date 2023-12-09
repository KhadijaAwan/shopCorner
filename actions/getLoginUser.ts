import { authenticationOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import prisma from "../helper/prismadb"

export async function getLoginData() {
    return await getServerSession(authenticationOptions);
}

export async function getUser() {
    try {
        const session = await getLoginData();
        if (!session?.user?.email) {
            return null;
        }

        const loginUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            },
            include: {
                orders: true,
            }
        })

        if (!loginUser) {
            return null;
        }

        return { ...loginUser, createdAt: loginUser.createdAt.toISOString(), updatedAt: loginUser.updateAt.toISOString(), emailVerified: loginUser.emailVerified?.toString() || null }
    } catch (error) {
        console.log(error);
    }
}