"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const CustomButtonGroup_1 = require("./groups/custom/CustomButtonGroup");
function ModeButton() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(CustomButtonGroup_1.CustomButtonGroup, Object.assign({}, { buttons: ['TPS', 'GPS', 'GTPS'] })) }));
}
exports.ModeButton = ModeButton;
