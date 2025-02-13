import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        // Invoked on successful sign in
        async signIn({ profile }) {
            // connect to the DB
            await connectDB();
            // Check if user exists in the DB
            const userExists = await User.findOne({ email: profile.email });
            // If not, create a new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.slice(0, 20),
                    image: profile.picture
                })
            }
            // Return true to allow sign in
            return true;
        },
        // session callback function that modifies session object
        async session({ session }) {
            // Get user from the session
            const user = await User.findOne({ email: session.user.email });
            // Assign user id from the session
            session.user.id = user._id.toString();
            // return session
            return session;
        }
    }
}