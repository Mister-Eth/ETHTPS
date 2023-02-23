"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomButtonGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function CustomButtonGroup(params) {
    var _a;
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.ButtonGroup, Object.assign({ variant: "contained", "aria-label": "outlined primary button group" }, { children: (_a = params === null || params === void 0 ? void 0 : params.buttons) === null || _a === void 0 ? void 0 : _a.map((x, i) => ((0, jsx_runtime_1.jsx)(material_1.Button, { children: x }, i))) })) }));
}
exports.CustomButtonGroup = CustomButtonGroup;
