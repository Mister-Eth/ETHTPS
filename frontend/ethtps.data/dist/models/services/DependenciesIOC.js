"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReconnect = exports.reconnect = exports.setRWS = exports.rws = exports.wsBaseURL = void 0;
exports.wsBaseURL = 'ws://localhost:2000/LiveData?XAPIKey=';
exports.rws = undefined;
const setRWS = (ws) => {
    exports.rws = ws;
};
exports.setRWS = setRWS;
exports.reconnect = false;
const setReconnect = (value) => {
    exports.reconnect = value;
};
exports.setReconnect = setReconnect;
