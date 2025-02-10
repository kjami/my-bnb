import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa"
import Property from '@/models/Property';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';

const page = async ({ params }) => {
    params = await params;
    const property = await Property.findOne({ _id: params.id }).lean();
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
                    </div>
                </div>
            </section>
        </>
    );
};

export default page;