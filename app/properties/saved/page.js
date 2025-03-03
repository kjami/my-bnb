import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import getSessionUser from "@/utils/get-session-user";
import { toast } from "react-toastify";

const SavedProperties = async () => {
    await connectDB();
    const { id: userId } = await getSessionUser();

    if (!userId) toast.error("Login error!");

    const { bookmarks } = await User.findById(userId).populate("bookmarks");

    console.log(bookmarks);

    return <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            { bookmarks.length === 0 ? <p>No saved properties.</p> :
                bookmarks.map((property) => <div key={property._id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PropertyCard property={property}/>
                </div>)
            }
        </div>
    </section>;
};

export default SavedProperties;