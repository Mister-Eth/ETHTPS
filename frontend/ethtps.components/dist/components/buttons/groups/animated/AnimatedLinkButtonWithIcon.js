"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedLinkButtonWithIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const LinksHelper_1 = require("../../../../LinksHelper");
const react_1 = __importDefault(require("react"));
// No animation YET
function AnimatedLinkButtonWithIcon(props) {
    const handleClick = () => {
        if (props.openInNewTab) {
            (0, LinksHelper_1.openNewTab)(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: props.text }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: handleClick, color: 'primary' }, { children: props.image })) })), props.showText ? (0, jsx_runtime_1.jsx)(material_1.Typography, { children: props.text }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})] }));
}
exports.AnimatedLinkButtonWithIcon = AnimatedLinkButtonWithIcon;
