"use server";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/get-session-user";
import Message from "@/models/Message";

async function addProperty (formData) {
    await connectDB();
    const session = await getSessionUser();

    if (!session) {
        throw new Error("User is not authenticated");
    }
    
    const recipient = formData.get("recipient");

    if (session.id === recipient) {
        return { error: "Message cannot be sent to your own property" };
    }

    const newMessage = new Message({
        sender: session.id,
        recipient,
        property: formData.get("property"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        body: formData.get("body"),
    });

    await newMessage.save();
};

export default addProperty;