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
import React from 'react';
import { ConditionalRender } from '../../../../Types';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { EvStation, LocalGasStation, Numbers } from '@mui/icons-material';
import { CurrentViewersIcon } from '../../CurrentViewersIcon';
import { DataType, useAppSelector, useHandler } from 'ethtps.data';
export function DataModeButtonGroup(model) {
    var mode = useHandler(model.modeHandle);
    var getColorComparedTo = function (proposedMode) {
        return proposedMode == (mode === null || mode === void 0 ? void 0 : mode.value) ? { color: 'primary' } : undefined;
    };
    var experimentsAppStoreValue = useAppSelector(function (state) { return state.experiments; });
    return (_jsx(React.Fragment, { children: _jsxs(Box, __assign({ sx: { float: 'right' } }, { children: [ConditionalRender(_jsx(CurrentViewersIcon, {}), (experimentsAppStoreValue === null || experimentsAppStoreValue === void 0 ? void 0 : experimentsAppStoreValue.includes(5)) && false), _jsx(Tooltip, __assign({ arrow: true, placement: 'top' }, getColorComparedTo(DataType.Tps), { title: _jsx(Typography, { children: "Transactions per second" }) }, { children: _jsx(IconButton, __assign({ onClick: function () { return mode === null || mode === void 0 ? void 0 : mode.setter(DataType.Tps); } }, { children: _jsx(Numbers, {}) })) })), _jsx(Tooltip, __assign({ arrow: true, placement: 'top' }, getColorComparedTo(DataType.Gps), { title: _jsx(Typography, { children: "Gas per second" }) }, { children: _jsx(IconButton, __assign({ onClick: function () { return mode === null || mode === void 0 ? void 0 : mode.setter(DataType.Gps); } }, { children: _jsx(LocalGasStation, {}) })) })), _jsx(Tooltip, __assign({ arrow: true, placement: 'top' }, getColorComparedTo(DataType.GasAdjustedTps), { title: _jsx(Typography, { children: "Gas-adjusted transactions per second" }) }, { children: _jsx(IconButton, __assign({ onClick: function () { return mode === null || mode === void 0 ? void 0 : mode.setter(DataType.GasAdjustedTps); } }, { children: _jsx(EvStation, {}) })) }))] })) }));
}
//# sourceMappingURL=DataModeButtonGroup.js.map