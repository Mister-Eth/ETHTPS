"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationBreadcrumb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
function LocationBreadcrumb() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 1 }, { children: (0, jsx_runtime_1.jsxs)(material_1.Breadcrumbs, Object.assign({ "aria-label": "breadcrumb" }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Link, Object.assign({ underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/" }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.Home, { sx: { mr: 0.5 }, fontSize: "inherit" }), "MUI"] })), (0, jsx_runtime_1.jsxs)(material_1.Link, Object.assign({ underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/material-ui/getting-started/installation/" }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.Whatshot, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Core"] })), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ sx: { display: 'flex', alignItems: 'center' }, color: "text.primary" }, { children: [(0, jsx_runtime_1.jsx)(icons_material_1.Grain, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Breadcrumb"] }))] })) })) }));
}
exports.LocationBreadcrumb = LocationBreadcrumb;
