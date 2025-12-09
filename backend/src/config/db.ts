import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set");
    }

    await mongoose.connect(uri);
    console.log(" MongoDB connected");
  } catch (err: any) {
    console.error(" MongoDB error:", err.message);
    process.exit(1);
  }
};
