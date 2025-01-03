import express, { Request, Response } from 'express';
import router from './routes/routes';
import cors from 'cors';
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send_message", (message) => {
    console.log(`Received: ${message}`);
    let responseMessage = "";

   
    if (message === "login") {
      responseMessage = "Login URL: http://localhost:5173/login"  
    } else if (message === "sign-up") {
      responseMessage = "Signup URL: http://localhost:5173/signup";
    } else {
      responseMessage = "Invalid command. Please send 'login' or 'sign-up' for help.";
    }

    
    socket.emit("receive_message", responseMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use("/api", router)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);