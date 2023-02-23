"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksFooter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function LinksFooter() {
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "bottomnavbar" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/Status" }, { children: "Status" })), (0, jsx_runtime_1.jsx)("div", { className: 'inline', style: { marginRight: '10px' } }), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://api.ethtps.info/API/v2/AllData" }, { children: "Download data" }))] })), (0, jsx_runtime_1.jsx)("hr", {})] }));
}
exports.LinksFooter = LinksFooter;
