'use client'
import { ClipLoader } from "react-spinners";

const loading = () => {
    const override = {
        display: "block",
        margin: "0 auto"
    };
    return (
        <ClipLoader
            color="#3b82f6"
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            />
    );
};

export default loading;