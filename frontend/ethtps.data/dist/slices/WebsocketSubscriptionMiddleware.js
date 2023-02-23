"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var WebsocketSubscriptionSlice_1 = require("./WebsocketSubscriptionSlice");
var reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
var LiveDataSlice_1 = require("./LiveDataSlice");
var store_1 = require("../store");
var DependenciesIOC_1 = require("../models/services/DependenciesIOC");
var wsURL = (0, store_1.useAppSelector)(function (state) { return state.websockets.wsURL; });
var websocketMiddleware = function (store) { return function (next) { return function (action) {
    if (!WebsocketSubscriptionSlice_1.websocketActions.connecting.match(action)) {
        return next(action);
    }
    return next(action);
    if (DependenciesIOC_1.reconnect && wsURL) {
        (0, DependenciesIOC_1.setReconnect)(false); //Only needs to be done once
        (0, DependenciesIOC_1.setRWS)(new reconnecting_websocket_1["default"](wsURL !== null && wsURL !== void 0 ? wsURL : ''));
        store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        DependenciesIOC_1.rws.addEventListener('open', function () {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connected());
        });
        DependenciesIOC_1.rws.addEventListener('close', function () {
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.disconnected());
            store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
        });
        DependenciesIOC_1.rws.addEventListener('message', function (e) {
            var _a;
            try {
                var obj = JSON.parse(e.data);
                var type = (_a = obj.Type) !== null && _a !== void 0 ? _a : 'unknown';
                switch (type) {
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.LiveDataReceived:
                        store.dispatch((0, LiveDataSlice_1.setLiveData)(obj.Data));
                        break;
                    case WebsocketSubscriptionSlice_1.WebsocketEvent.KeepAlive:
                        DependenciesIOC_1.rws.send('ack');
                        break;
                    default:
                        console.log("Unhandled event of type \"".concat(type, "\""));
                        break;
                }
            }
            catch (e) {
                console.log('WS Error: ' + e);
            }
        });
    }
    next(action);
}; }; };
exports["default"] = websocketMiddleware;
//# sourceMappingURL=WebsocketSubscriptionMiddleware.js.map