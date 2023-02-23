"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Logo() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ style: {
                textDecoration: 'none',
            }, to: "/" }, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'jumpy unselectable', style: {
                        fontSize: 30,
                        display: 'inline',
                    } }, { children: "ETHTPS.info" }))] })) }));
}
exports.Logo = Logo;
