import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    console.log("Connecting to:", uri); // debug

    await mongoose.connect(uri);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB ERROR:", error.message);
    process.exit(1);
  }
};

export default connectDB;