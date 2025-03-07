import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convert-to-object";

const SearchResultsPage = async ({ searchParams: { location, proprtyType }}) => {
    await connectDB();

    const locationPattern = new RegExp(location, "i");

    const query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { "location.street": locationPattern },
            { "location.city": locationPattern },
            { "location.state": locationPattern },
            { "location.zipcode": locationPattern },
        ]
    };

    if (proprtyType && proprtyType !== "All") {
        query.type = new RegExp(proprtyType, "i");
    }

    const res = await Property.find(query).lean();
    const properties = convertToSerializableObject(res);
    console.log(properties);

    return (<div>Search Results Page!</div>)
};

export default SearchResultsPage;