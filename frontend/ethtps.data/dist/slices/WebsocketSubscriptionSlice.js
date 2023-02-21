"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketReducer = exports.websocketActions = exports.WebsocketEvent = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const DependenciesIOC_1 = require("../models/services/DependenciesIOC");
const initialState = {
    isEstablishingConnection: false,
    isConnecting: false,
    isConnected: false,
};
const websocketSlice = (0, toolkit_1.createSlice)({
    name: "websockets",
    initialState,
    reducers: {
        connecting: (state) => {
            state.isConnecting = true;
            state.isConnected = false;
        },
        connected: (state) => {
            state.isConnected = true;
            state.isConnecting = false;
        },
        disconnected: (state) => {
            state.isConnecting = false;
            state.isConnected = false;
        },
        setWSURL(state, action) {
            state.wsURL = action.payload;
            (0, DependenciesIOC_1.setReconnect)(true);
            return state;
        },
    },
});
var WebsocketEvent;
(function (WebsocketEvent) {
    WebsocketEvent["KeepAlive"] = "keep_alive";
    WebsocketEvent["ReceivedPingRequest"] = "ping_request";
    WebsocketEvent["LiveDataReceived"] = "post_live_data";
    WebsocketEvent["VisitorCountChanged"] = "new_visitor_count";
})(WebsocketEvent = exports.WebsocketEvent || (exports.WebsocketEvent = {}));
exports.websocketActions = websocketSlice.actions;
exports.websocketReducer = websocketSlice.reducer;
exports.default = websocketSlice;
