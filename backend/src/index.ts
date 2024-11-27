import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { handleBroadcastMessage } from "./webSocket/eventHandler";

const app = express();
const server = app.listen(3000, () => {
  console.log("server started");
});
const wss = new WebSocketServer({ server });

app.use(cors());

//webSocket Connection
wss.on("connection", (ws) => {
  handleBroadcastMessage(wss, ws);
});
