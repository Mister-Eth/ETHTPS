"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworksDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const DataHooks_1 = require("ethtps.data/dist/hooks/DataHooks");
const react_1 = __importDefault(require("react"));
const Dropdown_1 = require("../types/Dropdown");
function NetworksDropdown(config) {
    const networks = (0, DataHooks_1.useGetNetworksFromAppStore)();
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(Dropdown_1.Dropdown, { hidden: config.hidden, options: networks, hoverText: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: 'Choose network' }), conversionFunction: (x) => x, selection: config.changed }) }));
}
exports.NetworksDropdown = NetworksDropdown;
