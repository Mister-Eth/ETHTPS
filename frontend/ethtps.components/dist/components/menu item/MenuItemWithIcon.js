"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemWithIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const LinksHelper_1 = require("../../LinksHelper");
const AnimatedLinkButtonWithIcon_1 = require("../buttons/groups/animated/AnimatedLinkButtonWithIcon");
// No animation YET
function MenuItemWithIcon(props) {
    const handleClick = () => {
        if (props.openInNewTab) {
            (0, LinksHelper_1.openNewTab)(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({ onMouseOverCapture: props.onMouseOverCapture, onClick: handleClick }, { children: (0, jsx_runtime_1.jsx)(AnimatedLinkButtonWithIcon_1.AnimatedLinkButtonWithIcon, { showText: true, openInNewTab: false, image: props.image, href: props.href, text: props.text }) }), props.myKey) }));
}
exports.MenuItemWithIcon = MenuItemWithIcon;
