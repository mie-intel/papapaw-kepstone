import mongoose from "mongoose";
// const dotenv = require('dotenv');

// dotenv.config();

export const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error connecting to MongoDB`, error);
        process.exit(1); // Exit process with failure
    }
};