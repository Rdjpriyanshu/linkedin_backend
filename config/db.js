import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("------- DB connected --------");
  } catch (err) {
    console.log("-------- db error ------------", err.message);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectDb;
