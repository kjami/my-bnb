import ProprtyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convert-to-object";

const EditPropertyPage = async ({ params }) => {
    await connectDB();

    let property = await Property.findById((await params).id);
    if (!property) return <h2 className="bold text-2xl">Property not found</h2>

    property = convertToSerializableObject(property);
    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <ProprtyEditForm property={property} />
                </div>
            </div>
        </section>
    )
}

export default EditPropertyPage;