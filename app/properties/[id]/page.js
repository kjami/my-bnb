import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"
import Property from '@/models/Property';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImage from "@/components/PropertyImage";
import { convertToSerializableObject } from "@/utils/convert-to-object";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const page = async ({ params }) => {
    params = await params;
    let property = await Property.findOne({ _id: params.id }).lean();

    if (!property) {
        return (<h2 className="text-2xl font-bold m-10">Property not found</h2>)
    }

    property = convertToSerializableObject(property);

    return (
        <>
            <PropertyHeaderImage property={property} />
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                    href="/properties"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                    >
                    <FaArrowLeft className="mr-2"/> Back to Properties
                    </Link>
                </div>
            </section>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <PropertyDetails property={property} />
                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            <ShareButtons property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>
            <PropertyImage images={property.images} />
        </>
    );
};

export default page;