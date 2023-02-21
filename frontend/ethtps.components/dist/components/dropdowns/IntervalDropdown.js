import { jsx as _jsx } from "react/jsx-runtime";
import { Container, Typography } from '@mui/material';
import { shortTimeIntervalToUIFormat } from '../../Types';
import { Dropdown } from './Dropdown';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import { Fragment } from 'react';
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
    return (_jsx(Fragment, { children: _jsx(Container, { sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            }, children: _jsx("div", { className: "inline", style: { float: 'right' }, children: _jsx(Dropdown, { options: intervals?.map((x) => toShortString_2(x)), selectionChanged: config.onChanged, conversionFunction: (x) => fromShortString_2(x), uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) }) }) }));
}
