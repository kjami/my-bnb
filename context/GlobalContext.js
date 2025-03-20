"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/get-unread-message-count";
import { useSession } from "next-auth/react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const { data: session } = useSession();

    useEffect(() => {
        getUnreadMessageCount().then((count) => setUnreadCount(count)); 
    }, [getUnreadMessageCount, session]);
    
    return <GlobalContext.Provider value={{
        unreadCount,
        setUnreadCount
    }}>
        {children}
    </GlobalContext.Provider>
};

export function useGlobalContext() {
    return useContext(GlobalContext);
}