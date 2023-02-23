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
import { TableCell, Typography } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import React from 'react';
import { centered } from '../../Cells.Types';
import { tableCellTypographyStandard } from './Typography.types';
import { useGetProviderTypeColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
export function ProviderTypeCell(config) {
    var _a, _b, _c;
    var colorDictionary = useGetProviderTypeColorDictionaryFromAppStore();
    var name = (_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : '';
    var color = colorDictionary !== undefined ? colorDictionary[name] : 'primary';
    return (_jsx(React.Fragment, { children: _jsx(TableCell, __assign({}, centered, buildClassNames(config), { sx: { color: color }, onClick: function () {
                return config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'ProviderType')
                    : function () { };
            } }, { children: _jsx(Typography, __assign({}, tableCellTypographyStandard, { children: (_c = config.provider) === null || _c === void 0 ? void 0 : _c.type })) })) }));
}
//# sourceMappingURL=ProviderTypeCell.js.map