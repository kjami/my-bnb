"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/get-session-user";

const getUnreadMessageCount = async () => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    const count = await Message.countDocuments({
        read: false,
        recipient: sessionUser.id
    });

    return count;
};

export default getUnreadMessageCount;