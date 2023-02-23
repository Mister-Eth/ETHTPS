"use strict";
exports.__esModule = true;
exports.fromShortString_2 = exports.toShortString_2 = exports.dataTypeToString = exports.toShortString = void 0;
var ethtps_api_client_1 = require("ethtps.api.client");
function toShortString(interval) {
    switch (interval) {
        case ethtps_api_client_1.TimeInterval.All:
            return 'All';
        case ethtps_api_client_1.TimeInterval.Instant:
            return 'Instant';
        case ethtps_api_client_1.TimeInterval.OneDay:
            return '1d';
        case ethtps_api_client_1.TimeInterval.OneHour:
            return '1h';
        case ethtps_api_client_1.TimeInterval.OneMinute:
            return '1m';
        case ethtps_api_client_1.TimeInterval.OneMonth:
            return '1mo';
        case ethtps_api_client_1.TimeInterval.OneYear:
            return '1y';
        default:
            return 'Other';
    }
}
exports.toShortString = toShortString;
function dataTypeToString(type) {
    switch (type) {
        case ethtps_api_client_1.DataType.Tps:
            return 'TPS';
        case ethtps_api_client_1.DataType.Gps:
            return 'GPS';
        default:
            return 'GTPS';
    }
}
exports.dataTypeToString = dataTypeToString;
// long string > short string
// example: OneMinute > 1m
function toShortString_2(intervalName) {
    switch (intervalName) {
        case 'OneDay':
            return '1d';
        case 'OneHour':
            return '1h';
        case 'OneMinute':
            return '1m';
        case 'OneMonth':
            return '1mo';
        case 'OneYear':
            return '1y';
        case 'OneWeek':
            return '1w';
        default:
            return intervalName;
    }
}
exports.toShortString_2 = toShortString_2;
function fromShortString_2(intervalName) {
    switch (intervalName) {
        case '1d':
            return 'OneDay';
        case '1h':
            return 'OneHour';
        case '1m':
            return 'OneMinute';
        case '1mo':
            return 'OneMonth';
        case '1y':
            return 'OneYear';
        case '1w':
            return 'OneWeek';
        default:
            return intervalName;
    }
}
exports.fromShortString_2 = fromShortString_2;
//# sourceMappingURL=TimeIntervals.js.map