import Navbar from "@/components/Navbar.js";
import Footer from "@/components/Footer.js";
import AuthProvider from "@/components/AuthProvider.js";
import "@/assets/styles/global.css";

export const metadata = {
    title: "My BnB",
    description: "A safe way to book your next stay.",
    keywords: "book, stay, safe, travel",
};

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <Navbar />
                    <main>{ children }</main>
                    <Footer />
                </body>
            </html>
        </AuthProvider>
    );
};

export default MainLayout;