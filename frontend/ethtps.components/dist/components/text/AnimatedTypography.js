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
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Typography } from '@mui/material';
import React from 'react';
export function AnimatedTypography(config) {
    return (_jsx(React.Fragment, { children: _createElement(Typography, __assign({}, config.standard, { className: config.animationClassName, key: config.child.toString(), textAlign: config.centerText ? 'center' : undefined }), config.child) }));
}
//# sourceMappingURL=AnimatedTypography.js.map