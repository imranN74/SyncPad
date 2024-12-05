"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const eventHandler_1 = require("./webSocket/eventHandler");
const content_1 = __importDefault(require("./http/content"));
const url_1 = __importDefault(require("url"));
exports.statusCode = {
    notFound: 404,
    notAuthorized: 401,
    forbidden: 403,
    badRequest: 400,
    serverError: 500,
    success: 200,
    created: 201,
    accepted: 202,
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = app.listen(3000, () => {
    console.log("server started");
});
const wss = new ws_1.WebSocketServer({ server });
app.use((0, cors_1.default)());
//webSocket Connection
wss.on("connection", (ws, req) => {
    const parsedKey = req.url ? url_1.default.parse(req.url, true) : null;
    const urlKey = parsedKey === null || parsedKey === void 0 ? void 0 : parsedKey.query.roomId;
    const roomId = urlKey ? urlKey[0] : "xyz";
    //handle room creation
    (0, eventHandler_1.handleRoom)(roomId, ws);
    //handle data broadcasting
    (0, eventHandler_1.handleBroadcastMessage)(wss, ws);
});
//http server
app.use("/api/v1/content", content_1.default);
