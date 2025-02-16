import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth-options";

export default async () => {
    const session = await getServerSession(authOptions);
    return (!session || !session.user) ? null : session.user;
};
