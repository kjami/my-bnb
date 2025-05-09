import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/global.css";
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: "My BnB",
    description: "A safe way to book your next stay.",
    keywords: "book, stay, safe, travel",
};

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html lang="en" suppressHydrationWarning>
                    <body>
                        <Navbar />
                        <main>{ children }</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
};

export default MainLayout;