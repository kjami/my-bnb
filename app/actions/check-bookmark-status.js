"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import getSessionUser from "@/utils/get-session-user";

const checkBooKMarkStatus = async (propertyId) => {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) throw new Error("Login error!");

    const user = await User.findById(sessionUser.id);

    let isBookmarked = user.bookmarks.includes(propertyId);

    return {
        isBookmarked
    }
};

export default checkBooKMarkStatus;