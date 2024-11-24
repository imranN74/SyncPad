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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const eventHandler_1 = require("./webSocket/eventHandler");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = app.listen(3000, () => {
    console.log("server started");
});
const wss = new ws_1.WebSocketServer({ server });
app.use((0, cors_1.default)());
wss.on("connection", (ws) => {
    ws.on("error", (error) => {
        console.log(error);
    });
    ws.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const incomingData = JSON.parse(data.toString());
        const response = yield prisma.content.findFirst({
            where: {
                urlKey: incomingData.urlKey,
            },
        });
        response ? (0, eventHandler_1.updateContent)(data.toString()) : (0, eventHandler_1.createContent)(data.toString());
        (0, eventHandler_1.handleBroadcastMessage)(wss, data.toString());
    }));
});
