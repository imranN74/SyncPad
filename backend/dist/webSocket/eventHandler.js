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
exports.createContent = exports.handleBroadcastMessage = void 0;
exports.updateContent = updateContent;
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const handleBroadcastMessage = (wss, data) => __awaiter(void 0, void 0, void 0, function* () {
    const messageData = JSON.parse(data);
    const response = yield prisma.content.findMany({
        where: {
            urlKey: messageData.urlKey,
        },
    });
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(messageData.message);
        }
    });
});
exports.handleBroadcastMessage = handleBroadcastMessage;
const createContent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const messageData = JSON.parse(data);
    yield prisma.content.create({
        data: {
            urlKey: messageData.urlKey,
            content: messageData.message,
        },
    });
});
exports.createContent = createContent;
function updateContent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageData = JSON.parse(data);
        const currDate = new Date();
        yield prisma.content.updateMany({
            data: {
                content: messageData.message,
                updatedAt: currDate,
            },
            where: {
                urlKey: messageData.urlKey,
            },
        });
    });
}
