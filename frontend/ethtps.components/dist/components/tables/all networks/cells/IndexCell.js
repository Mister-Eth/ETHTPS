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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, TableCell } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import { ArrowRight } from '@mui/icons-material';
import { ConditionalRender } from '../../../../Types';
import React from 'react';
export function IndexCell(config) {
    return (_jsx(React.Fragment, { children: _jsx(TableCell, __assign({}, buildClassNames(config), { onClick: function () {
                return config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'Index')
                    : function () { };
            } }, { children: _jsx(IconButton, { children: _jsxs(_Fragment, { children: [ConditionalRender(_jsx(ArrowRight, {}), config.showTick), config.index] }), sx: {
                    fontSize: '13px',
                    height: '1rem',
                    width: '2rem',
                    fontWeight: config.showTick ? 'bold' : undefined,
                } }) })) }));
}
//# sourceMappingURL=IndexCell.js.map