"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/get-session-user";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId) => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    const message = await Message.findById(messageId);
    
    console.log(message.read, "before")
    if (!message || message.recipient.toString() !== sessionUser.id) throw new Error("Unauthorized!");

    message.read = !message.read;
    console.log(message.read, "after")

    revalidatePath("/messages", "page");

    await message.save();

    return {
        read: message.read
    }
};

export default markMessageAsRead;