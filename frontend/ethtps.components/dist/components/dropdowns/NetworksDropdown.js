import { jsx as _jsx } from "react/jsx-runtime";
import { Dropdown } from './Dropdown';
import { Typography } from '@mui/material';
import { useGetNetworksFromAppStore } from 'ethtps.data/dist/hooks/DataHooks';
import { Fragment } from 'react';
export function NetworksDropdown(config) {
    const networks = useGetNetworksFromAppStore();
    return (_jsx(Fragment, { children: _jsx(Dropdown, { hidden: config.hidden, options: networks, defaultOption: 'Mainnet', hoverText: _jsx(Typography, { children: 'Choose network' }), conversionFunction: (x) => x, selectionChanged: config.selectionChanged }) }));
}
