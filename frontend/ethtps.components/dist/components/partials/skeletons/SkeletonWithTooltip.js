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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { ConditionalRender } from '../../../Types';
import { Box } from '@mui/system';
import React from 'react';
export function SkeletonWithTooltip(config) {
    var _a;
    var message = (_a = config.text) !== null && _a !== void 0 ? _a : 'Loading...';
    var _b = useState(config.randomDelay), delay = _b[0], setDelay = _b[1];
    if (config.randomDelay !== undefined) {
        if (config.randomDelay === true) {
            setTimeout(function () { return setDelay(false); }, Math.random() * 250);
        }
    }
    return (_jsx(_Fragment, { children: _jsx(React.Fragment, { children: ConditionalRender(_jsx(Tooltip, __assign({ arrow: true, title: _jsx(Typography, { children: message }) }, { children: _jsx(Box, __assign({ sx: { width: '90%' } }, { children: _jsx(Skeleton, { className: 'w-hundred', variant: config.rectangular
                            ? 'rectangular'
                            : undefined }) })) })), !delay) }) }));
}
//# sourceMappingURL=SkeletonWithTooltip.js.map