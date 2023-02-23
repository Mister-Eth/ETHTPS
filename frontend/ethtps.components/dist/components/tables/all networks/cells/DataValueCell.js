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
import { buildClassNames, } from './ICustomCellConfiguration';
import { TableCell } from '@mui/material';
import { tableCellTypographyStandard } from './Typography.types';
import { centered } from '../../Cells.Types';
import '../../cells.styles.css';
import { AnimatedTypography } from '../../../text/AnimatedTypography';
import { toShortString, numberFormat } from 'ethtps.data';
import React from 'react';
import { SkeletonWithTooltip } from '../../../partials/skeletons/SkeletonWithTooltip';
export function DataValueCell(config) {
    var _a;
    return (_jsx(React.Fragment, { children: _jsx(TableCell, __assign({}, centered, buildClassNames(config), { onClick: function () {
                return config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'DataValue')
                    : function () { };
            } }, { children: config.value === undefined ? (_jsx(SkeletonWithTooltip, { text: "Loading ".concat((_a = config.provider) === null || _a === void 0 ? void 0 : _a.name, " ").concat(toShortString(config.dataType), "...") })) : (_jsx(AnimatedTypography, { animationClassName: "animated-cell", standard: tableCellTypographyStandard, child: numberFormat(config.value).toString(), durationMs: 1000 })) })) }));
}
//# sourceMappingURL=DataValueCell.js.map