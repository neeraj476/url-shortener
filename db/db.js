import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener";
        await mongoose.connect(dbURI);
        console.log("MongoDB connected successfully");

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;
