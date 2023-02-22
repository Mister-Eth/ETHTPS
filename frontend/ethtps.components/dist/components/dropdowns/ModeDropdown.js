import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { Dropdown } from './Dropdown';
import { fromShortString, appModeToUIFormat } from '../../Types';
import React from 'react';
export function ModeDropdown(config) {
    const types = ['TPS', 'GPS', 'GTPS'];
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { options: types, hidden: config.hidden, selectionChanged: config.selectionChanged, conversionFunction: fromShortString, uiFormatFunction: appModeToUIFormat, hoverText: _jsx(Typography, { children: 'Select data type' }) }) }));
}
