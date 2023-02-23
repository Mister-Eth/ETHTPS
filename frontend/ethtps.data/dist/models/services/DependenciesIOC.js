"use strict";
exports.__esModule = true;
exports.setReconnect = exports.reconnect = exports.setRWS = exports.rws = exports.wsBaseURL = void 0;
exports.wsBaseURL = 'ws://localhost:2000/LiveData?XAPIKey=';
exports.rws = undefined;
var setRWS = function (ws) {
    exports.rws = ws;
};
exports.setRWS = setRWS;
exports.reconnect = false;
var setReconnect = function (value) {
    exports.reconnect = value;
};
exports.setReconnect = setReconnect;
//# sourceMappingURL=DependenciesIOC.js.map