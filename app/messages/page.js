import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import getSessionUser from "@/utils/get-session-user";
import { convertToSerializableObject } from "@/utils/convert-to-object";

const MessagePage = async () => {
    await connectDB();

    const session = await getSessionUser();

    if (!session) throw new Error("Login error!");

    console.log(session.id)
    const readMessages = await Message.find({ recipient: session.id, read: true })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("property", "name")
        .lean();

    const unreadMessages = await Message.find({ recipient: session.id, read: false })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("property", "name")
        .lean();

    const messages = [...unreadMessages, ...readMessages];
    console.log(messages);

    messages.map((messageDoc) => {
        const message = convertToSerializableObject(messageDoc);
        message.sender = convertToSerializableObject(messageDoc.sender);
        message.property = convertToSerializableObject(messageDoc.property);
        return message;
    });

    return (<section className="bg-blue-50">
        <div className="container m-auto py-24 max-w-6xl">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <h1 className="text-3xl font-bold mb-4">Messages</h1>
                <div className="space-y-4">
                    {messages.length === 0 ? (<p>You have no messages</p>) : (
                        messages.map((message) => <h3 key={message._id}>{message.name} {message.read ? "Read" : "Unread"}</h3>)
                    )}
                </div>
            </div>
        </div>
    </section>)
};
export default MessagePage;