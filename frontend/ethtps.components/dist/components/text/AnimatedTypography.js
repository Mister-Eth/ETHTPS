import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Typography } from '@mui/material';
import { Fragment } from 'react';
export function AnimatedTypography(config) {
    return (_jsx(Fragment, { children: _createElement(Typography, { ...config.standard, className: config.animationClassName, key: config.child.toString(), textAlign: config.centerText ? 'center' : undefined }, config.child) }));
}
