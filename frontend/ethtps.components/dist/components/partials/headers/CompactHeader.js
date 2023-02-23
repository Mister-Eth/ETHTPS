"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SocialMediaLinksSection_1 = require("../SocialMediaLinksSection");
const material_1 = require("@mui/material");
const Logo_1 = require("../Logo");
const AppBar_1 = __importDefault(require("@mui/material/AppBar"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const LinksSection_1 = require("../LinksSection");
const react_1 = __importDefault(require("react"));
function CompactHeader() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(AppBar_1.default, Object.assign({ position: 'sticky', enableColorOnDark: true, color: 'default' }, { children: (0, jsx_runtime_1.jsx)(Toolbar_1.default, { children: (0, jsx_runtime_1.jsxs)(material_1.Container, { children: [(0, jsx_runtime_1.jsx)(Logo_1.Logo, {}), (0, jsx_runtime_1.jsx)(LinksSection_1.LinksSection, {}), (0, jsx_runtime_1.jsx)(SocialMediaLinksSection_1.SocialMediaLinksSection, {})] }) }) })) }));
}
exports.CompactHeader = CompactHeader;
