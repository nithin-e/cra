import dotenv from 'dotenv';
dotenv.config(); // This should be at the top of your file

import mongoose from 'mongoose';
// Other imports...

const connectDB = async () => {
    try {
        console.log("DB_URL:", process.env.DB_URL); // Check if the DB_URL is now defined
        const conn = await mongoose.connect(process.env.DB_URL as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
