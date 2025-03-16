"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/get-session-user";
import { revalidatePath } from "next/cache";
import { convertToSerializableObject } from "@/utils/convert-to-object";

const deleteMessage = async (messageId) => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    let message = await Message.findById(messageId);

    if (message) message = convertToSerializableObject(message);
    
    if (!message || message.recipient.toString() !== sessionUser.id) throw new Error("Unauthorized!");

    await message.deleteOne();

    revalidatePath("/messages", "page");
};

export default deleteMessage;