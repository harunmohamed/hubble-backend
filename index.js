import express from "express";
import { Server }from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import hashtagRoute from "./routes/hashtag.js";
import cors from "cors";
import connect from "./utils/mongoConnect.js";
import {saveMessage, createRoom} from './controllers/chats.js';
const app = express();

dotenv.config();

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(express.json()); 
app.set("trust proxy", true);

app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
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


const server = app.listen(8000, () => console.log("Server started on port 8000."));
  
const io = new Server(server, {
    cors: {
      origin: "http://localhost:8000",
      credentials: true
    },
});

io.of('/api/chat').on('connection', (socket) => {
  console.log("socket is connected!")

  socket.on('room', async (data) => {
    // handle room creation
    console.log("socket receive data on room -->", data)

    try {
      data = JSON.parse(data)
    } catch (e) {
      if (e instanceof SyntaxError){
        data = {}
        socket.emit('roomResponse', {"msg": "Error in room socket: " + e.message})
      }
    }
    const roomData = data ? await createRoom(data) : {}

    let message = {"msg": false}

    roomData ? message["msg"] = 'Success' : message

    socket.emit('roomResponse', message) 
  });

  socket.on('message', async (data) => {
    // handle send/receive messages
    console.log("socket receive data on message --> " , data)
    
    try {
      data = JSON.parse(data)
    } catch (e) {
      if (e instanceof SyntaxError){
        data = {}
        socket.emit('messageResponse', {"msg": "Error in message socket: " + e.message})
        return;
      }
    }

    const messageData = data ? await saveMessage(data) : {}
    let message = {"msg" : false}

    messageData ? message["msg"] = "Success" : message; 

    socket.emit('messageResponse', message)
  });

  
  socket.on('disconnect', async () => {
    console.log('socket disconnected!')
  });

});


const start = async () => {
  try { 
    await connect()
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start(); 