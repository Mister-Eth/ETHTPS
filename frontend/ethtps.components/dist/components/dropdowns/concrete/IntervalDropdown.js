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
import { shortTimeIntervalToUIFormat } from 'ethtps.data';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import React from 'react';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { Dropdown } from '../types/Dropdown';
export function IntervalDropdown(config) {
    var intervals = [
        'OneMinute',
        'OneHour',
        'OneDay',
        'OneWeek',
        'OneMonth',
        'OneYear',
        'All',
        'Custom',
    ];
    return (_jsx(React.Fragment, { children: _jsx(Container, __assign({ sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            } }, { children: _jsx("div", __assign({ className: "inline", style: { float: 'right' } }, { children: _jsx(Dropdown, { options: intervals === null || intervals === void 0 ? void 0 : intervals.map(function (x) { return toShortString_2(x); }), selection: config.changed, conversionFunction: function (x) { return fromShortString_2(x); }, uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) })) })) }));
}
//# sourceMappingURL=IntervalDropdown.js.map