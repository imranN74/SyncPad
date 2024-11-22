"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
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
    ws.on("message", (data, isBinary) => {
        console.log(data);
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
