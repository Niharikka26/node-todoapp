import express from "express";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app=express();

config(
  {
     path:"./data/config.env",
  });

//Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET","PUT","POST","DELETE"],
  credentials: true,
}))

//Using Routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/task",taskRoutes);



app.get("/",(req,res)=>{
  res.send("Nice Working");
});

//Using error middlewares
app.use(errorMiddleware);
