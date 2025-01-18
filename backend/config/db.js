import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected`);
  } catch (error) {
    console.log("Mongodb connection error", error);
  }
};

export default connectDB;
