import prisma from "../helper/prismadb";

export default async function getAllUsers() {
  try {
    const allUsers = prisma?.user.findMany();

    return allUsers;
  } catch (error) {
    console.log(error);
  }
}
