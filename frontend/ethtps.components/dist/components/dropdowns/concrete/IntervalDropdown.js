"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ethtps_data_1 = require("ethtps.data");
const TimeIntervals_1 = require("ethtps.data/dist/models/TimeIntervals");
const react_1 = __importDefault(require("react"));
const system_1 = require("@mui/system");
const material_1 = require("@mui/material");
const Dropdown_1 = require("../types/Dropdown");
function IntervalDropdown(config) {
    const intervals = [
        'OneMinute',
        'OneHour',
        'OneDay',
        'OneWeek',
        'OneMonth',
        'OneYear',
        'All',
        'Custom',
    ];
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(system_1.Container, Object.assign({ sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            } }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inline", style: { float: 'right' } }, { children: (0, jsx_runtime_1.jsx)(Dropdown_1.Dropdown, { options: intervals === null || intervals === void 0 ? void 0 : intervals.map((x) => (0, TimeIntervals_1.toShortString_2)(x)), selection: config.changed, conversionFunction: (x) => (0, TimeIntervals_1.fromShortString_2)(x), uiFormatFunction: ethtps_data_1.shortTimeIntervalToUIFormat, hoverText: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: 'Select time interval' }) }) })) })) }));
}
exports.IntervalDropdown = IntervalDropdown;
