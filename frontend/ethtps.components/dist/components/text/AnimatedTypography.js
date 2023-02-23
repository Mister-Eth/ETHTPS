"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedTypography = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_2 = __importDefault(require("react"));
function AnimatedTypography(config) {
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, react_1.createElement)(material_1.Typography, Object.assign({}, config.standard, { className: config.animationClassName, key: config.child.toString(), textAlign: config.centerText ? 'center' : undefined }), config.child) }));
}
exports.AnimatedTypography = AnimatedTypography;
