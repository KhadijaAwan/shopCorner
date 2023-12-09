import { User } from "@prisma/client";

export type SafeManner = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};
