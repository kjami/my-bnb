"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import getSessionUser from "@/utils/get-session-user";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId) => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    const user = await User.findById(sessionUser.id);

    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (!isBookmarked) {
        user.bookmarks.push(propertyId);
        isBookmarked = true;
        message = "Bookmark Added";
    } else {
        user.bookmarks.pull(propertyId);
        isBookmarked = false;
        message = "Bookmark Removed";
    }

    await user.save();
    revalidatePath("/properties/saved", "page");

    return {
        message,
        isBookmarked
    }
};

export default bookmarkProperty;