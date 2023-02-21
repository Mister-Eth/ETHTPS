import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grain, Home, Whatshot } from '@mui/icons-material';
import { Breadcrumbs, Link, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useLocation } from 'react-router';
export function LocationBreadcrumb() {
    const location = useLocation();
    return (_jsx(Fragment, { children: _jsx(Paper, { elevation: 1, children: _jsxs(Breadcrumbs, { "aria-label": "breadcrumb", children: [_jsxs(Link, { underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/", children: [_jsx(Home, { sx: { mr: 0.5 }, fontSize: "inherit" }), "MUI"] }), _jsxs(Link, { underline: "hover", sx: { display: 'flex', alignItems: 'center' }, color: "primary", href: "/material-ui/getting-started/installation/", children: [_jsx(Whatshot, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Core"] }), _jsxs(Typography, { sx: { display: 'flex', alignItems: 'center' }, color: "text.primary", children: [_jsx(Grain, { sx: { mr: 0.5 }, fontSize: "inherit" }), "Breadcrumb"] })] }) }) }));
}
