"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Dropdown_1 = require("../types/Dropdown");
const ethtps_data_1 = require("ethtps.data");
function ModeDropdown(config) {
    const types = ['TPS', 'GPS', 'GTPS'];
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(Dropdown_1.Dropdown, { options: types, hidden: config.hidden, selection: config.changed, conversionFunction: ethtps_data_1.fromShortString, uiFormatFunction: ethtps_data_1.appModeToUIFormat, hoverText: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: 'Select data type' }) }) }));
}
exports.ModeDropdown = ModeDropdown;
