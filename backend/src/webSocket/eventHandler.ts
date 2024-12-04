import { WebSocket, WebSocketServer } from "ws";

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
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageData.message);
      }
    });
  });

  //when server closes
  ws.on("close", () => {
    console.log("Client disconnected");
  });
};
