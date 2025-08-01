import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
};

export default connectDb;