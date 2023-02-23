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
import { Visibility } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
export function CurrentViewersIcon() {
    return (_jsx(React.Fragment, { children: _jsx(Tooltip, __assign({ arrow: true, title: _jsx(Typography, { children: "Nobody's here" }) }, { children: _jsx(IconButton, { children: _jsx(Visibility, {}) }) })) }));
}
//# sourceMappingURL=CurrentViewersIcon.js.map