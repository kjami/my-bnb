/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "lh3.googleusercontent.com",
            protocol: "https",
            pathname: "**"
        }, {
            hostname: "res.cloudinary.com",
            protocol: "https",
            pathname: "**"
        }, {
            hostname: "events.mapbox.com",
            protocol: "https",
            pathname: "**"
        }]
    }
};

export default nextConfig;
