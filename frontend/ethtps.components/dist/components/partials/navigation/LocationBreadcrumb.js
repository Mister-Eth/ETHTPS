var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grain, Home, Whatshot } from '@mui/icons-material';
import { Breadcrumbs, Link, Paper, Typography } from '@mui/material';
import React from 'react';
export function LocationBreadcrumb() {
    return (_jsx(React.Fragment, { children: _jsx(Paper, __assign({ elevation: 1 }, { children: _jsxs(Breadcrumbs, __assign({ "aria-label": "breadcrumb" }, { children: [_jsxs(Link, __assign({ underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/" }, { children: [_jsx(Home, { sx: { mr: 0.5 }, fontSize: "inherit" }), "MUI"] })), _jsxs(Link, __assign({ underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/material-ui/getting-started/installation/" }, { children: [_jsx(Whatshot, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Core"] })), _jsxs(Typography, __assign({ sx: { display: 'flex', alignItems: 'center' }, color: "text.primary" }, { children: [_jsx(Grain, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Breadcrumb"] }))] })) })) }));
}
//# sourceMappingURL=LocationBreadcrumb.js.map