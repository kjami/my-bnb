"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/config/database";
import getSessionUser from "@/utils/get-session-user";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";

async function addProperty (formData) {
    await connectDB();
    const session = await getSessionUser();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const images = formData.getAll("images")
        .filter((image) => image.name !== "");
    
    const propertyData = {
        owner: session.id,
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        amenities: formData.get("amenities"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipcode: formData.get("location.zipcode")
        },
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        square_feet: formData.get("square_feet"),
        rates: {
            nightly: formData.get("rates.nightly"),
            weekly: formData.get("rates.weekly"),
            monthly: formData.get("rates.monthly")
        },
        seller_info: {
            name: formData.get("seller_info.name"),
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        }
    };

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