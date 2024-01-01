import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      minPoolSize: 20,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

export default connectMongoDB;
