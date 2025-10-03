import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import http from'http'
import {connectDB} from './lib/db.js'
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// create express app and http server 
const app = express();
const server = http.createServer(app);

// init socket.io server
export const io = new server(server,{
    cors: {origin: "*"}
})

// store onlie users
export const userSocketMap = {}; //{userId, socketId}

// socket.io connection handler
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);
    
    if(userId) userSocketMap[userId]= socket.id;

    // Emit online users to all connection client 
    io.emit("getOnlineUers", Object.keys(userSocketMap));

    socket.on("dissconnect",()=>{
        console.log("user Dissconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
}) 

// middleware setup 
app.use(express.json({limit:'4mb'}));
app.use(cors());

// route setup
app.use("/api/status",(req, res)=> res.send("server is running"))
app.use("/api/auth",userRouter)
app.use("/api/messages", messageRouter)

// connect db
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log("server is running on port: "+ PORT))






//  ChatApp - fEgRs1j0nZl9GcD2