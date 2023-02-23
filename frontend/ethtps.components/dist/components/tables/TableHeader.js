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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { TableRow, TableCell } from '@mui/material';
import { centered } from './Cells.Types';
import { Typography } from '@mui/material/';
import { tableHeaderCellTypography } from './all networks/cells/Typography.types';
import React from 'react';
export function TableHeader(params) {
    var _a;
    return (_jsx(React.Fragment, { children: _jsx(TableRow, { children: (_a = params.text) === null || _a === void 0 ? void 0 : _a.map(function (x, i) { return (_jsx(TableCell, __assign({ sx: { fontWeight: 'bold' } }, centered, { children: _jsxs(Typography, __assign({}, tableHeaderCellTypography, { children: [' ', x] })) }), i)); }) }) }));
}
//# sourceMappingURL=TableHeader.js.map