"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function TabPanel(props) {
    const { children, value, index } = props, other = __rest(props, ["children", "value", "index"]);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}` }, other, { children: value === index && ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { p: 3 } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: children }) }))) })) }));
}
exports.TabPanel = TabPanel;
