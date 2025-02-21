"use server";
import connectDB from "@/config/database";
import getSesssionUser from "@/utils/get-session-user";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import propertyFromFormData from "@/utils/property-from-form-data";

async function updateProperty(propertyId, formData) {
    await connectDB();

    const session = await getSesssionUser();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const property = await Property.findById(propertyId);
    if (!property || property.owner.toString() !== session.id) throw new Error("Unable to find the property");

    const propertyData = propertyFromFormData(formData, session.id);

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);
    revalidatePath("/", "layout");
    redirect(`/properties/${updatedProperty._id.toString()}`)
};

export default updateProperty;