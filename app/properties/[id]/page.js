const page = async ({ params }) => {
    params = await params;
    return (
        <>
            <div>Property Page {params.id}</div>
        </>
    );
};

export default page;