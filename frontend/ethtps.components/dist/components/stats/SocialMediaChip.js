"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaChip = exports.SocialMediaChipCollection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const groupby_js_1 = require("groupby-js");
const getIconForWebsite = (website) => {
    switch (website.toUpperCase()) {
        default:
            return (0, jsx_runtime_1.jsx)(icons_material_1.Web, {});
    }
};
const formatUrl = (url) => {
    if (!(url === null || url === void 0 ? void 0 : url.startsWith('http://')))
        url = 'http://' + url;
    return url;
};
function SocialMediaChipCollection(config) {
    const links = (0, groupby_js_1.groupBy)('category', config.links);
    if (links === undefined || links.length === 0)
        return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Chip, { className: "spaced-vertically", label: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    } }, { children: "No data available" })), variant: "outlined", color: "primary" }) }));
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: links.flatMap((group, i) => {
            return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Chip, { label: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ sx: {
                                fontWeight: 'bold',
                            } }, { children: group.title })) }), group.items.map((x, i) => ((0, jsx_runtime_1.jsx)(SocialMediaChip, { href: x.url, websiteName: x.name }, i)))] }, i));
        }) }));
}
exports.SocialMediaChipCollection = SocialMediaChipCollection;
function SocialMediaChip(config) {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Chip, { className: "spaced-vertically", icon: getIconForWebsite(config.websiteName), label: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ fontSize: '1em', color: "primary.text" }, { children: (0, jsx_runtime_1.jsx)(material_1.Link, Object.assign({ href: formatUrl(config.href), underline: 'hover', color: "inherit", sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    }, variant: "h6", rel: "noopener" }, { children: config.websiteName })) })), 
            //variant="outlined"
            color: "primary", sx: {
                marginTop: '1em',
            } }) }));
}
exports.SocialMediaChip = SocialMediaChip;
