import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log("------- DB connected --------");
    }catch(err){
        console.log("-------- db error ------------")
    }
}
export default connectDb