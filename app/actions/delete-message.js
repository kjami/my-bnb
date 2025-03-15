"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/get-session-user";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    const message = await Message.findById(messageId);
    
    if (!message || message.recipient !== sessionUser.id) throw new Error("Unauthorized!");

    await message.remove();

    revalidatePath("/messages", "page");
};

export default deleteMessage;