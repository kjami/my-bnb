"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/get-session-user";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId) => {
    const sessionUser = await getSessionUser();
    await connectDB();

    if (!sessionUser) throw new Error("User not logged in! Please retry");

    const property = await Property.findById(propertyId);

    if (!property || property.owner.toString() !== sessionUser.id) throw new Error("Unauthorized");

    await property.deleteOne();

    property.images.forEach(async (property) => {
        const imageId = property.split("/").at(-1).split(".").at(0);
        await cloudinary.uploader.destroy(`mybnb/${imageId}`);
    });

    revalidatePath("/", "layout");
};

export default deleteProperty;