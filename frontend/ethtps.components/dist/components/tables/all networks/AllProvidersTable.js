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
import { TableContainer, Paper, Table, TableHead, TableBody, } from '@mui/material';
import { useState } from 'react';
import { AllProvidersHeader } from './AllProvidersHeader';
import { AllProvidersRows } from './AllProvidersRows';
import React from 'react';
import { SeeMoreButton } from '../../buttons/see-more/SeeMoreButton';
import { ConditionalRender } from '../../../Types';
export function AllProvidersTable(tableData) {
    var _a;
    var oldShowRowCountValue = tableData.maxRowsBeforeShowingExpand;
    var _b = useState(tableData === null || tableData === void 0 ? void 0 : tableData.maxRowsBeforeShowingExpand), showRowCount = _b[0], setShowRowCount = _b[1];
    var onSeeMore = function () {
        var _a;
        setShowRowCount((_a = tableData.providerData) === null || _a === void 0 ? void 0 : _a.length);
    };
    var onSeeLess = function () {
        setShowRowCount(oldShowRowCountValue);
    };
    return (_jsxs(React.Fragment, { children: [_jsx(TableContainer, __assign({ component: Paper }, { children: _jsxs(Table
                //size="small"
                , __assign({ 
                    //size="small"
                    sx: {
                        minWidth: 750,
                    }, "aria-label": "collapsible table" }, { children: [_jsx(TableHead, { children: _jsx(AllProvidersHeader, {}) }), _jsx(TableBody, { children: _jsx(AllProvidersRows, __assign({}, tableData, { maxRowsBeforeShowingExpand: showRowCount })) })] })) })), ConditionalRender(_jsx(SeeMoreButton, { enabled: ((_a = tableData.providerData) === null || _a === void 0 ? void 0 : _a.length) > 0, onSeeMore: onSeeMore, onSeeLess: onSeeLess }), showRowCount > 0)] }));
}
//# sourceMappingURL=AllProvidersTable.js.map