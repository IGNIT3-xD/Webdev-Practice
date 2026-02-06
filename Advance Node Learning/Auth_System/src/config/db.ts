import mongoose from 'mongoose'
import config from '../config'

const connectDB = async () => {
    try {
        const URI = config.URI

        if (!URI) {
            throw new Error('URI is missing.')
        }

        console.log(URI);   

        await mongoose.connect(URI)
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error)
        process.exit(1)
    }
}

export default connectDB;