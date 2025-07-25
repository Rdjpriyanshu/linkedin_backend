import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
dotenv.config()
const allowedOrigins = [
  "http://localhost:5173",
  "https://linkedin-frontend-rjyt.vercel.app",
];
const port=process.env.PORT
let app=express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter);



app.listen(port,()=>{
    connectDb();
    console.log("-----  SERVER STARTED------");
})