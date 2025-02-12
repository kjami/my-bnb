import GoogleProvider from "next-auth/providers/google";

export default {
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
            // Check if user exists in the DB
            // If not, create a new user
            // Return true to allow sign in
        },
        // session callback function that modifies session object
        async session({ session }) {
            // Get user from the session
            // Assign user id from the session
            // return session
        }
    }
}