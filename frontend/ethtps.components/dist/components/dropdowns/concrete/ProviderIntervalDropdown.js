"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderIntervalDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ethtps_data_1 = require("ethtps.data");
const TimeIntervals_1 = require("ethtps.data/dist/models/TimeIntervals");
const react_1 = __importDefault(require("react"));
const Dropdown_1 = require("../types/Dropdown");
const react_2 = require("react");
function ProviderIntervalDropdown(config) {
    var _a, _b, _c;
    const intervals = (0, ethtps_data_1.useHandler)(config.availableIntervals);
    const noDataAvailable = (0, ethtps_data_1.useHandler)(config.noDataAvailable);
    (_a = config.loader) === null || _a === void 0 ? void 0 : _a.dataGetter().then((x) => {
        intervals === null || intervals === void 0 ? void 0 : intervals.setter(x);
    }).catch(ethtps_data_1.handleException);
    (0, react_2.useEffect)(() => {
        var _a;
        if (((_a = intervals === null || intervals === void 0 ? void 0 : intervals.value) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            noDataAvailable === null || noDataAvailable === void 0 ? void 0 : noDataAvailable.setter(config.provider);
        }
    }, [intervals === null || intervals === void 0 ? void 0 : intervals.value]);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(Dropdown_1.Dropdown, { hidden: intervals === undefined, options: (_c = (_b = intervals === null || intervals === void 0 ? void 0 : intervals.value) === null || _b === void 0 ? void 0 : _b.map((x) => (0, TimeIntervals_1.toShortString_2)(x)).concat(true ? [] : ['Custom'])) !== null && _c !== void 0 ? _c : [] //We'll work on this later on
            , selection: config.changed, conversionFunction: (x) => (0, TimeIntervals_1.fromShortString_2)(x), uiFormatFunction: ethtps_data_1.shortTimeIntervalToUIFormat, hoverText: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: 'Select time interval' }) }) }));
}
exports.ProviderIntervalDropdown = ProviderIntervalDropdown;
