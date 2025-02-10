import mongoose from 'mongoose';
let connected = false;

const connectDB = async () => {
    if (connected === true) {
        console.log("Database connected");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        connected = true;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        connected = false;
        process.exit(1);
    }
};

export default connectDB;