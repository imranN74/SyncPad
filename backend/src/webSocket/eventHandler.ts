import { WebSocket, WebSocketServer } from "ws";

// room logics
const rooms: { [roomId: string]: Set<WebSocket> } = {};
export function handleRoom(roomId: string, ws: WebSocket) {
  if (!rooms[roomId]) {
    rooms[roomId] = new Set();
  }
  rooms[roomId].add(ws);
  console.log(rooms[roomId]);
}

export const handleBroadcastMessage = async (
  wss: WebSocketServer,
  ws: WebSocket
) => {
  //on error
  ws.on("error", (error) => {
    console.log(error);
  });

  //to boradcast message
  ws.on("message", async (data) => {
    const messageData = JSON.parse(data.toString());
    const roomId = messageData.urlKey;
    const message = messageData.message;
    rooms[roomId].forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  //when server closes
  ws.on("close", () => {
    console.log("Client disconnected");
  });
};
