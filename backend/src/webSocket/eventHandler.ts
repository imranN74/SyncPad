import { WebSocket, WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handleBroadcastMessage = async (
  wss: WebSocketServer,
  data: string
) => {
  const messageData = JSON.parse(data);
  const response = await prisma.content.findMany({
    where: {
      urlKey: messageData.urlKey,
    },
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageData.message);
    }
  });
};

export const createContent = async (data: string) => {
  const messageData = JSON.parse(data);
  await prisma.content.create({
    data: {
      urlKey: messageData.urlKey,
      content: messageData.message,
    },
  });
};

export async function updateContent(data: string) {
  const messageData = JSON.parse(data);
  const currDate = new Date();
  await prisma.content.updateMany({
    data: {
      content: messageData.message,
      updatedAt: currDate,
    },
    where: {
      urlKey: messageData.urlKey,
    },
  });
}
