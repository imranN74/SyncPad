import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const server = app.listen(3000);
const wss = new WebSocketServer({ server: server });

app.use(cors());

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.log(error);
  });

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(3000, () => {
  console.log("Server started");
});
