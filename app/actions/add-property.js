"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/get-session-user";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import propertyFromFormData from "@/utils/property-from-form-data";

async function addProperty (formData) {
    await connectDB();
    const session = await getSessionUser();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const images = formData.getAll("images")
        .filter((image) => image.name !== "");
    
    const propertyData = propertyFromFormData(formData, session.id);

    const imageUrls = [];

    for (const image of images) {
        const buffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(buffer));
        const imageData = Buffer.from(imageArray);
        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
            folder: "mybnb"
        });

        imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const property = new Property(propertyData);
    await property.save();

    revalidatePath("/", "layout");
    redirect(`/properties/${property._id}`);
};

export default addProperty;