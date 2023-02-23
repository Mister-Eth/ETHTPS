import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { useGetNetworksFromAppStore } from 'ethtps.data/dist/hooks/DataHooks';
import React from 'react';
import { Dropdown } from '../types/Dropdown';
export function NetworksDropdown(config) {
    var networks = useGetNetworksFromAppStore();
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { hidden: config.hidden, options: networks, hoverText: _jsx(Typography, { children: 'Choose network' }), conversionFunction: function (x) { return x; }, selection: config.changed }) }));
}
//# sourceMappingURL=NetworksDropdown.js.map