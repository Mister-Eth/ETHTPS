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
import { Typography, TableCell, Tooltip } from '@mui/material';
import { numberFormat, liveDataHooks } from 'ethtps.data';
import { useGetMaxDataForProviderFromAppStore } from 'ethtps.data/dist/hooks/DataHooks';
import moment from 'moment';
import React from 'react';
import { centered } from '../../Cells.Types';
import { buildClassNames, } from './ICustomCellConfiguration';
import { tableCellTypographyStandard } from './Typography.types';
function generateMaxHoverMessage(data) {
    var _a;
    if (data === undefined ||
        ((data === null || data === void 0 ? void 0 : data.blockNumber) === undefined && (data === null || data === void 0 ? void 0 : data.date) === undefined) ||
        (data === null || data === void 0 ? void 0 : data.blockNumber) === 0 ||
        moment(data === null || data === void 0 ? void 0 : data.date).year() === undefined ||
        moment(data === null || data === void 0 ? void 0 : data.date).year() === 1) {
        return '';
    }
    if ((data === null || data === void 0 ? void 0 : data.blockNumber) !== undefined && (data === null || data === void 0 ? void 0 : data.blockNumber) !== 0) {
        return "Seen at block ".concat(numberFormat((_a = data === null || data === void 0 ? void 0 : data.blockNumber) !== null && _a !== void 0 ? _a : 0).toString());
    }
    return "Seen ".concat(moment(data === null || data === void 0 ? void 0 : data.date));
}
function generateMaxTypography(data) {
    var message = generateMaxHoverMessage(data);
    return (message === null || message === void 0 ? void 0 : message.length) > 0 ? _jsx(Typography, { children: message }) : undefined;
}
export function MaxValueCell(config) {
    var _a;
    var type = liveDataHooks.useGetLiveDataModeFromAppStore();
    var maxData = useGetMaxDataForProviderFromAppStore((_a = config.provider) === null || _a === void 0 ? void 0 : _a.name, type);
    var tooltipTypography = generateMaxTypography(maxData);
    return (_jsx(React.Fragment, { children: _jsx(TableCell, __assign({}, centered, buildClassNames(config), { onClick: function () {
                return config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'MaxValue')
                    : function () { };
            } }, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "top-start", title: tooltipTypography }, { children: _jsx(Typography, __assign({}, tableCellTypographyStandard, { sx: {
                        textDecoration: tooltipTypography !== undefined
                            ? 'underline'
                            : undefined,
                    } }, { children: numberFormat(maxData === null || maxData === void 0 ? void 0 : maxData.value).toString() })) })) })) }));
}
//# sourceMappingURL=MaxValueCell.js.map