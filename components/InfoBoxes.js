import Infobox from "./InfoBox";

const InfoBoxes = () => {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <Infobox title="For Renters" buttonInfo={{
                        text: "Browse Properties",
                        link: "/properties",
                        backgroudColor: "bg-black"
                    }}>Find your dream rental property. Bookmark properties and contact
                    owners.</Infobox>
                    <Infobox title="For Property Owners" backgroudColor="bg-blue-100" buttonInfo={{
                        text: "Add Property",
                        link: "/properties/add",
                        backgroudColor: "bg-blue-500"
                    }}>List your properties and reach potential tenants. Rent as an
                    airbnb or long term.</Infobox>
                </div>
            </div>
        </section>
    );
};

export default InfoBoxes;