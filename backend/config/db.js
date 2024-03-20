import mongoose from "mongoose";

const connectDB = async (db) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {dbName: 'nanotech_shop'});
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Eror connecting: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;