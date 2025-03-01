"use client";

import bookmarkProperty from "@/app/actions/bookmark-property";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const handleClick = async () => {
        if (!userId) {
            toast.error("Only logged in users can bookmark listing!");
            return;
        }

        try {
            const res = await bookmarkProperty(property._id);
            toast.success(res.message);
        } catch (err) {
            toast.error("Error while adding listing to bookmark!");
        }
    }
    return (<button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        onClick={handleClick}
      >
        <FaBookmark className="mr-2"/> Bookmark Property
      </button>);
};

export default BookmarkButton;