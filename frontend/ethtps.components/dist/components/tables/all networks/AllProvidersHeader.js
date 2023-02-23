"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllProvidersHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ethtps_data_1 = require("ethtps.data");
const react_1 = __importDefault(require("react"));
const TableHeader_1 = require("../TableHeader");
function AllProvidersHeader() {
    const mode = ethtps_data_1.liveDataHooks.useGetLiveDataModeFromAppStore();
    const modeStr = (0, ethtps_data_1.toShortString)(mode);
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [' ', (0, jsx_runtime_1.jsx)(TableHeader_1.TableHeader, { text: ['#', 'Name', modeStr, `Max recorded ${modeStr}`, 'Type'] })] }));
}
exports.AllProvidersHeader = AllProvidersHeader;
