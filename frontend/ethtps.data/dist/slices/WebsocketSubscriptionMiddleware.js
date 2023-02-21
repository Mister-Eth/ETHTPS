"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebsocketSubscriptionSlice_1 = require("./WebsocketSubscriptionSlice");
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
const LiveDataSlice_1 = require("./LiveDataSlice");
let connect = true;
const rws = new reconnecting_websocket_1.default("ws://localhost:2000");
const websocketMiddleware = (store) => (next) => (action) => {
    if (!WebsocketSubscriptionSlice_1.websocketActions.connecting.match(action)) {
        return next(action);
    }
    if (connect) {
        connect = false; //Only needs to be done once
        store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        rws.addEventListener("open", () => {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connected());
        });
        rws.addEventListener("close", () => {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.disconnected());
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        });
        rws.addEventListener("message", (e) => {
            var _a;
            try {
                let obj = JSON.parse(e.data);
                let type = (_a = obj.Type) !== null && _a !== void 0 ? _a : "unknown";
                switch (type) {
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.LiveDataReceived:
                        store.dispatch((0, LiveDataSlice_1.setLiveData)(obj.Data));
                        break;
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.KeepAlive:
                        rws.send("ack");
                        break;
                    default:
                        console.log(`Unhandled event of type "${type}"`);
                        break;
                }
            }
            catch (e) {
                console.log("WS Error: " + e);
            }
        });
    }
    next(action);
};
exports.default = websocketMiddleware;
