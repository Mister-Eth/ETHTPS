import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import React from 'react';
import { Dropdown } from '../types/Dropdown';
import { appModeToUIFormat, fromShortString } from 'ethtps.data';
export function ModeDropdown(config) {
    var types = ['TPS', 'GPS', 'GTPS'];
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { options: types, hidden: config.hidden, selection: config.changed, conversionFunction: fromShortString, uiFormatFunction: appModeToUIFormat, hoverText: _jsx(Typography, { children: 'Select data type' }) }) }));
}
//# sourceMappingURL=ModeDropdown.js.map