"use strict";
exports.__esModule = true;
exports.websocketReducer = exports.websocketActions = exports.WebsocketEvent = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var DependenciesIOC_1 = require("../models/services/DependenciesIOC");
var initialState = {
    isEstablishingConnection: false,
    isConnecting: false,
    isConnected: false
};
var websocketSlice = (0, toolkit_1.createSlice)({
    name: 'websockets',
    initialState: initialState,
    reducers: {
        connecting: function (state) {
            state.isConnecting = true;
            state.isConnected = false;
        },
        connected: function (state) {
            state.isConnected = true;
            state.isConnecting = false;
        },
        disconnected: function (state) {
            state.isConnecting = false;
            state.isConnected = false;
        },
        setWSURL: function (state, action) {
            state.wsURL = action.payload;
            (0, DependenciesIOC_1.setReconnect)(true);
            return state;
        }
    }
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
exports["default"] = websocketSlice;
//# sourceMappingURL=WebsocketSubscriptionSlice.js.map