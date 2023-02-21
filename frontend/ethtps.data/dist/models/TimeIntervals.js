"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromShortString_2 = exports.toShortString_2 = exports.dataTypeToString = exports.toShortString = exports.TimeInterval = void 0;
const ethtps_api_client_1 = require("ethtps.api.client");
var TimeInterval;
(function (TimeInterval) {
    TimeInterval[TimeInterval["Instant"] = 0] = "Instant";
    TimeInterval[TimeInterval["_1m"] = 1] = "_1m";
    TimeInterval[TimeInterval["_1h"] = 2] = "_1h";
    TimeInterval[TimeInterval["_1d"] = 3] = "_1d";
    TimeInterval[TimeInterval["_1mo"] = 4] = "_1mo";
    TimeInterval[TimeInterval["_1y_"] = 5] = "_1y_";
    TimeInterval[TimeInterval["All"] = 6] = "All";
    TimeInterval[TimeInterval["Other"] = 7] = "Other";
})(TimeInterval = exports.TimeInterval || (exports.TimeInterval = {}));
function toShortString(interval) {
    switch (interval) {
        case TimeInterval.All:
            return "All";
        case TimeInterval.Instant:
            return "Instant";
        case TimeInterval._1d:
            return "1d";
        case TimeInterval._1h:
            return "1h";
        case TimeInterval._1m:
            return "1m";
        case TimeInterval._1mo:
            return "1mo";
        case TimeInterval._1y_:
            return "1y";
        default:
            return "Other";
    }
}
exports.toShortString = toShortString;
function dataTypeToString(type) {
    switch (type) {
        case ethtps_api_client_1.DataType.Tps:
            return "TPS";
        case ethtps_api_client_1.DataType.Gps:
            return "GPS";
        default:
            return "GTPS";
    }
}
exports.dataTypeToString = dataTypeToString;
// long string > short string
// example: OneMinute > 1m
function toShortString_2(intervalName) {
    switch (intervalName) {
        case "OneDay":
            return "1d";
        case "OneHour":
            return "1h";
        case "OneMinute":
            return "1m";
        case "OneMonth":
            return "1mo";
        case "OneYear":
            return "1y";
        case "OneWeek":
            return "1w";
        default:
            return intervalName;
    }
}
exports.toShortString_2 = toShortString_2;
function fromShortString_2(intervalName) {
    switch (intervalName) {
        case "1d":
            return "OneDay";
        case "1h":
            return "OneHour";
        case "1m":
            return "OneMinute";
        case "1mo":
            return "OneMonth";
        case "1y":
            return "OneYear";
        case "1w":
            return "OneWeek";
        default:
            return intervalName;
    }
}
exports.fromShortString_2 = fromShortString_2;
