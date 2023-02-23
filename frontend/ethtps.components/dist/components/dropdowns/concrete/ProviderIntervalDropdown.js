import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { shortTimeIntervalToUIFormat, useHandler, handleException, } from 'ethtps.data';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import React from 'react';
import { Dropdown } from '../types/Dropdown';
import { useEffect } from 'react';
export function ProviderIntervalDropdown(config) {
    var _a, _b, _c;
    var intervals = useHandler(config.availableIntervals);
    var noDataAvailable = useHandler(config.noDataAvailable);
    (_a = config.loader) === null || _a === void 0 ? void 0 : _a.dataGetter().then(function (x) {
        intervals === null || intervals === void 0 ? void 0 : intervals.setter(x);
    }).catch(handleException);
    useEffect(function () {
        var _a;
        if (((_a = intervals === null || intervals === void 0 ? void 0 : intervals.value) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            noDataAvailable === null || noDataAvailable === void 0 ? void 0 : noDataAvailable.setter(config.provider);
        }
    }, [intervals === null || intervals === void 0 ? void 0 : intervals.value]);
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { hidden: intervals === undefined, options: (_c = (_b = intervals === null || intervals === void 0 ? void 0 : intervals.value) === null || _b === void 0 ? void 0 : _b.map(function (x) { return toShortString_2(x); }).concat(true ? [] : ['Custom'])) !== null && _c !== void 0 ? _c : [] //We'll work on this later on
            , selection: config.changed, conversionFunction: function (x) { return fromShortString_2(x); }, uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) }));
}
//# sourceMappingURL=ProviderIntervalDropdown.js.map