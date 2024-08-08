import mongoose from "mongoose";

let connected = false;

export const DBConnection = async () => {
    try {
        mongoose.set("strictQuery", true);
        if (connected) return console.log("MongoDB Is Already Connected");

        await mongoose.connect(process.env.DATABASE_URI! || process.env.DATABASE_URL!);

        connected = true;
        console.log("Run MongoDB");
    } catch (error) {
        console.log((error as any).message);
    }
};
