import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";

const app = express();
const server = app.listen(3000, () => {
  console.log("server started");
});
const wss = new WebSocketServer({ server });

app.use(cors());

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.log(error);
  });

  ws.on("message", (data, isBinary) => {
    console.log(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
