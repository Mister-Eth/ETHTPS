import { jsx as _jsx } from "react/jsx-runtime";
import { shortTimeIntervalToUIFormat } from 'ethtps.data';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import React from 'react';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { Dropdown } from '../types/Dropdown';
export function IntervalDropdown(config) {
    const intervals = [
        'OneMinute',
        'OneHour',
        'OneDay',
        'OneWeek',
        'OneMonth',
        'OneYear',
        'All',
        'Custom',
    ];
    return (_jsx(React.Fragment, { children: _jsx(Container, { sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            }, children: _jsx("div", { className: "inline", style: { float: 'right' }, children: _jsx(Dropdown, { options: intervals?.map((x) => toShortString_2(x)), selection: config.changed, conversionFunction: (x) => fromShortString_2(x), uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) }) }) }));
}
