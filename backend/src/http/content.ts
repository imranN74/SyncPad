import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { statusCode } from "..";
import { createContent, updateContent } from "./handleContent";

const router = Router();
const prisma = new PrismaClient();

//handle content
router.post("/handle/:key", async (req: Request, res: Response) => {
  const urlKey = req.params.key;
  const { content } = req.body;
  try {
    if (!urlKey) {
      res.status(statusCode.badRequest).json({
        message: "url unique key is missing",
      });
      return;
    }
    const response = await prisma.content.findFirst({
      where: {
        urlKey: urlKey,
      },
    });

    if (response) {
      updateContent(urlKey, content);
      res.status(statusCode.accepted);
      return;
    } else {
      createContent(urlKey, content);
      res.status(statusCode.created);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error while syncing data",
    });
  }
});

//get data on first page load
router.get("/:key", async (req: Request, res: Response) => {
  const urlKey = req.params.key;
  try {
    const response = await prisma.content.findMany({
      where: {
        urlKey: urlKey,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 1,
    });

    if (response.length === 0) {
      const content = "";
      const response = createContent(urlKey, content);
      res.status(statusCode.accepted).json({
        response,
      });
      return;
    }

    res.status(statusCode.accepted).json({
      response,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error fetching synced data",
    });
  }
});

export default router;
