import Link from "next/link";
import PropertyCard from "./PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
    await connectDB();
    const recentProperties = await Property.find({})
    .sort({createdAt: -1})
    .limit(3)
    .lean();
  return (
    <>
      <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 px-6">
                {recentProperties.length === 0 ?
                    <p>No properties found!</p> :
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                }
            </div>
        </section>
        <section className="mx-auto max-w-lg px-6 my-6">
            <div className="container-xl lg:container m-auto px-4 px-6">
                <Link href="/properties" className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View all properties</Link>
            </div>
        </section>
    </>
  );
};

export default HomeProperties;