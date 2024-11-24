import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import {
  handleBroadcastMessage,
  createContent,
  updateContent,
} from "./webSocket/eventHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  ws.on("message", async (data) => {
    const incomingData = JSON.parse(data.toString());
    const response = await prisma.content.findFirst({
      where: {
        urlKey: incomingData.urlKey,
      },
    });
    response ? updateContent(data.toString()) : createContent(data.toString());
    handleBroadcastMessage(wss, data.toString());
  });
});
