"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebsocketSubscriptionSlice_1 = require("./WebsocketSubscriptionSlice");
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
const LiveDataSlice_1 = require("./LiveDataSlice");
const store_1 = require("../store");
const DependenciesIOC_1 = require("../models/services/DependenciesIOC");
const wsURL = (0, store_1.useAppSelector)((state) => state.websockets.wsURL);
const websocketMiddleware = (store) => (next) => (action) => {
    if (!WebsocketSubscriptionSlice_1.websocketActions.connecting.match(action)) {
        return next(action);
    }
    return next(action);
    if (DependenciesIOC_1.reconnect && wsURL) {
        (0, DependenciesIOC_1.setReconnect)(false); //Only needs to be done once
        (0, DependenciesIOC_1.setRWS)(new reconnecting_websocket_1.default(wsURL !== null && wsURL !== void 0 ? wsURL : ''));
        store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        DependenciesIOC_1.rws.addEventListener('open', () => {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connected());
        });
        DependenciesIOC_1.rws.addEventListener('close', () => {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.disconnected());
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        });
        DependenciesIOC_1.rws.addEventListener('message', (e) => {
            var _a;
            try {
                let obj = JSON.parse(e.data);
                let type = (_a = obj.Type) !== null && _a !== void 0 ? _a : 'unknown';
                switch (type) {
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.LiveDataReceived:
                        store.dispatch((0, LiveDataSlice_1.setLiveData)(obj.Data));
                        break;
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.KeepAlive:
                        DependenciesIOC_1.rws.send('ack');
                        break;
                    default:
                        console.log(`Unhandled event of type "${type}"`);
                        break;
                }
            }
            catch (e) {
                console.log('WS Error: ' + e);
            }
        });
    }
    next(action);
};
exports.default = websocketMiddleware;
