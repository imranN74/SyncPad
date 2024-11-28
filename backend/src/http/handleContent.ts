import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContent = async (urlKey: string, content: string) => {
  await prisma.content.create({
    data: {
      urlKey: urlKey,
      content: content,
    },
  });
};

export const updateContent = async (urlKey: string, content: string) => {
  const currDataTime = new Date();

  await prisma.content.updateMany({
    where: {
      urlKey: urlKey,
    },
    data: {
      content: content,
      updatedAt: currDataTime,
    },
  });
};
