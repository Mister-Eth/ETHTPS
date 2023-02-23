"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentViewersIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function CurrentViewersIcon() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Nobody's here" }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { children: (0, jsx_runtime_1.jsx)(icons_material_1.Visibility, {}) }) })) }));
}
exports.CurrentViewersIcon = CurrentViewersIcon;
