import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { handleBroadcastMessage } from "./webSocket/eventHandler";
import contentRouter from "./http/content";

export const statusCode = {
  notFound: 404,
  notAuthorized: 401,
  forbidden: 403,
  badRequest: 400,
  serverError: 500,
  success: 200,
  created: 201,
  accepted: 202,
} as const;

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

//http server
app.use("/api/v1/content", contentRouter);
