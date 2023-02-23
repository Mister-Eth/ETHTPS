"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaLinksSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const DiscordIcon_1 = require("../icons/DiscordIcon");
const react_1 = __importDefault(require("react"));
const AnimatedLinkButtonWithIcon_1 = require("../buttons/groups/animated/AnimatedLinkButtonWithIcon");
function SocialMediaLinksSection() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.ButtonGroup, Object.assign({ sx: { float: 'right' } }, { children: [(0, jsx_runtime_1.jsx)(AnimatedLinkButtonWithIcon_1.AnimatedLinkButtonWithIcon, { openInNewTab: true, image: (0, jsx_runtime_1.jsx)(icons_material_1.GitHub, {}), href: 'https://github.com/Mister-Eth/ETHTPS', text: 'Github repository' }), (0, jsx_runtime_1.jsx)(AnimatedLinkButtonWithIcon_1.AnimatedLinkButtonWithIcon, { openInNewTab: true, image: (0, jsx_runtime_1.jsx)(icons_material_1.Twitter, {}), href: 'https://twitter.com/ethtps', text: 'Twitter' }), (0, jsx_runtime_1.jsx)(AnimatedLinkButtonWithIcon_1.AnimatedLinkButtonWithIcon, { openInNewTab: true, image: (0, jsx_runtime_1.jsx)(DiscordIcon_1.DiscordIcon, {}), href: 'https://discord.gg/jWPcsTzpCT', text: 'Join our Discord' })] })) }));
}
exports.SocialMediaLinksSection = SocialMediaLinksSection;
