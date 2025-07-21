import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
dotenv.config()
const port=process.env.PORT||5000
let app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter);

app.use(cookieParser());

app.listen(port,()=>{
    connectDb();
    console.log("-----  SERVER STARTED------");
})