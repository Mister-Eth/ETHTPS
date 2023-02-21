"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberFormat = exports.uniform = exports.inline = exports.shortTimeIntervalToUIFormat = exports.appModeToUIFormat = exports.StringTimeValue = exports.TimeValue = exports.getModeData = exports.extractData = exports.fromShortString = exports.toShortString = void 0;
const moment_1 = __importDefault(require("moment"));
const ethtps_api_client_1 = require("ethtps.api.client");
const TimeIntervals_1 = require("../../models/TimeIntervals");
function toShortString(type) {
    switch (type) {
        case ethtps_api_client_1.DataType.Tps:
            return 'TPS';
        case ethtps_api_client_1.DataType.Gps:
            return 'GPS';
        case ethtps_api_client_1.DataType.GasAdjustedTps:
            return 'GTPS';
        default:
            return 'Unknown';
    }
}
exports.toShortString = toShortString;
function fromShortString(typeStr) {
    switch (typeStr.toUpperCase()) {
        case 'TPS':
            return ethtps_api_client_1.DataType.Tps;
        case 'GPS':
            return ethtps_api_client_1.DataType.Gps;
        default:
            return ethtps_api_client_1.DataType.GasAdjustedTps;
    }
}
exports.fromShortString = fromShortString;
// Have to use any because it has a weird structure. Whose fault could it be?
const extractData = (dict, providerName) => {
    if (dict && providerName && dict[providerName]) {
        if (dict[providerName].at(0)) {
            let q = dict[providerName].at(0);
            if (q) {
                let result = q.Value;
                return Math.round(result * 100) / 100;
            }
        }
    }
    return 0;
};
exports.extractData = extractData;
const getModeData = (model, mode) => {
    switch (mode) {
        case ethtps_api_client_1.DataType.Tps:
            return model === null || model === void 0 ? void 0 : model.tps;
        case ethtps_api_client_1.DataType.Gps:
            return model === null || model === void 0 ? void 0 : model.gps;
        case ethtps_api_client_1.DataType.GasAdjustedTps:
            return model === null || model === void 0 ? void 0 : model.gasAdjustedTPS;
    }
};
exports.getModeData = getModeData;
class TimeValue {
    constructor(p) {
        var _a;
        this.x = (0, moment_1.default)(p === null || p === void 0 ? void 0 : p.date);
        this.y = (_a = p === null || p === void 0 ? void 0 : p.value) !== null && _a !== void 0 ? _a : 0;
    }
}
exports.TimeValue = TimeValue;
class StringTimeValue {
    constructor(p) {
        var _a, _b, _c;
        this.x = (_b = (_a = p === null || p === void 0 ? void 0 : p.date) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
        this.y = (_c = p === null || p === void 0 ? void 0 : p.value) !== null && _c !== void 0 ? _c : 0;
    }
}
exports.StringTimeValue = StringTimeValue;
const appModeToUIFormat = (mode) => {
    switch (toShortString(mode).toUpperCase()) {
        case 'TPS':
            return 'Transactions per second';
        case 'GPS':
            return 'Gas per second';
        default:
            return 'Gas-adjusted transactions per second';
    }
};
exports.appModeToUIFormat = appModeToUIFormat;
const shortTimeIntervalToUIFormat = (interval) => {
    switch ((0, TimeIntervals_1.toShortString_2)(interval).toUpperCase()) {
        case '1H':
            return 'One hour';
        case '1M':
            return 'One month';
        case '1D':
            return 'One day';
        case '1W':
            return 'One week';
        case '1MO':
            return 'One month';
        case '1Y':
            return 'One year';
        default:
            return interval;
    }
};
exports.shortTimeIntervalToUIFormat = shortTimeIntervalToUIFormat;
exports.inline = {
    className: 'inline',
};
function uniform(size) {
    return {
        style: {
            width: size,
            height: size,
        },
    };
}
exports.uniform = uniform;
const numberFormat = (value) => {
    if (!value)
        return 0;
    if (value > 1000)
        value = Math.round(value);
    return (Math.round(value * 100) / 100).toLocaleString();
};
exports.numberFormat = numberFormat;
