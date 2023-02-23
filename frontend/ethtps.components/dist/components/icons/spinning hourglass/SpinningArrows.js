"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinningArrows = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./Spinning hourglass.css");
const icons_material_1 = require("@mui/icons-material");
function SpinningArrows() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(icons_material_1.Autorenew, { className: "rotation-animation" }) }));
}
exports.SpinningArrows = SpinningArrows;
