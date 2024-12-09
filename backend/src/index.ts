import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { handleBroadcastMessage, handleRoom } from "./webSocket/eventHandler";
import contentRouter from "./http/content";
import url from "url";

const PORT = process.env.PORT || 3000;

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
app.use(express.json());
const server = app.listen(PORT, () => {
  console.log("server started");
});
const wss = new WebSocketServer({ server });

app.use(cors());

//webSocket Connection
wss.on("connection", (ws, req) => {
  const parsedKey = req.url ? url.parse(req.url, true) : null;
  const urlKey = parsedKey?.query.roomId;
  // const roomId = urlKey ? urlKey : "xyz";
  // console.log(roomId);

  //handle room creation
  if (typeof urlKey === "string") {
    handleRoom(urlKey, ws);
  } else {
    console.log("inavlid roomId");
  }
  //handle data broadcasting
  handleBroadcastMessage(wss, ws);
});

//http server
app.use("/api/v1/content", contentRouter);
