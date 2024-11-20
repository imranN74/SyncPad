import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("content", (data) => {
    socket.broadcast.emit("recieve_content", data);
  });
});

server.listen(3000, () => {
  console.log("Server started");
});
