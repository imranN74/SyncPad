"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const __1 = require("..");
const handleContent_1 = require("./handleContent");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
//handle content
router.post("/handle/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlKey = req.params.key;
    const { content } = req.body;
    try {
        if (!urlKey) {
            res.status(__1.statusCode.badRequest).json({
                message: "url unique key is missing",
            });
            return;
        }
        const response = yield prisma.content.findFirst({
            where: {
                urlKey: urlKey,
            },
        });
        if (response) {
            (0, handleContent_1.updateContent)(urlKey, content);
            res.status(__1.statusCode.accepted);
            return;
        }
        else {
            (0, handleContent_1.createContent)(urlKey, content);
            res.status(__1.statusCode.created);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(__1.statusCode.serverError).json({
            message: "error while syncing data",
        });
    }
}));
//get data on first page load
router.get("/:key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlKey = req.params.key;
    try {
        const response = yield prisma.content.findMany({
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
            const response = (0, handleContent_1.createContent)(urlKey, content);
            res.status(__1.statusCode.accepted).json({
                response,
            });
            return;
        }
        res.status(__1.statusCode.accepted).json({
            response,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(__1.statusCode.serverError).json({
            message: "error fetching synced data",
        });
    }
}));
exports.default = router;
