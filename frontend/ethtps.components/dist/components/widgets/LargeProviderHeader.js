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
import { Typography } from '@mui/material';
import { inline, uniform } from 'ethtps.data';
import React from 'react';
export function LargeProviderHeader(config) {
    var _a, _b, _c;
    return (_jsx(React.Fragment, { children: _jsxs("div", __assign({ className: 'box', style: { float: 'left' } }, { children: [_jsx("img", __assign({ alt: "".concat((_a = config.provider) === null || _a === void 0 ? void 0 : _a.name, " image"), src: "/provider-icons/".concat((_b = config.provider) === null || _b === void 0 ? void 0 : _b.name, ".png") }, inline, uniform('2em'))), _jsx(Typography, __assign({}, inline, { sx: {
                        fontWeight: 'bold',
                        fontSize: '2em',
                        marginLeft: '0.2em',
                    } }, { children: (_c = config.provider) === null || _c === void 0 ? void 0 : _c.name }))] })) }));
}
//# sourceMappingURL=LargeProviderHeader.js.map