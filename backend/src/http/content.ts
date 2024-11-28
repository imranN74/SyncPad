import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { statusCode } from "..";

const router = Router();
const prisma = new PrismaClient();

//create content
router.post("/create", async (req: Request, res: Response) => {
  const { content, key } = req.body;
  try {
    if (!key) {
      res.status(statusCode.badRequest).json({
        message: "url unique key is missing",
      });
    }
    await prisma.content.create({
      data: {
        urlKey: key,
        content: content,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error while syncing data",
    });
  }
});

//update content
router.post("/update/:key", async (req: Request, res: Response) => {
  const urlKey = req.params.key;
  const { content } = req.body;
  try {
    if (!urlKey) {
      res.status(statusCode.badRequest).json({
        message: "url unique key is missing",
      });
    }

    const currDataTime = new Date();

    await prisma.content.updateMany({
      data: {
        content: content,
        updatedAt: currDataTime,
      },
      where: {
        urlKey: urlKey,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error syncing data",
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

    res.status(statusCode.accepted).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.serverError).json({
      message: "error fetching synced data",
    });
  }
});

export default router;
