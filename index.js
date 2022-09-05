import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import messageRoute from "./routes/message.js";
import hashtagRoute from "./routes/hashtag.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./utils/mongoConnect.js";

const app = express();
dotenv.config();



mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.json()); 
app.set("trust proxy", true);

app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/chat", messageRoute);
app.use("/api/hashtag", hashtagRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(errorMessage)
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const start = async () => {
  try { 
    await connect()
    app.listen(8800, () => {
      console.log("Server started on port 8800.");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();