import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, AlertTitle, Box, Modal, Paper } from '@mui/material';
import { ProviderDataChart } from '../../../charts/provider/ProviderDataChart';
import { ConditionalRender } from '../../../../Types';
import { useState } from 'react';
import React from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px line #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const generateNoDataAvailableString = (provider) => `There is no data available for ${provider}. If you're seeing this, it probably means there is no chain explorer integration available for ${provider} or that we haven't yet synchronized the data for ${provider} after the update. Please try again later. If you still don't see any data after a while, drop us a message on `;
export function ProviderModal(config) {
    const [noData, setNoData] = useState(false);
    return (_jsx(React.Fragment, { children: _jsx(Modal, { keepMounted: false, open: config.open, "aria-labelledby": "parent-modal-title", "aria-describedby": "parent-modal-description", onClose: () => {
                setNoData(false);
                config.onClose();
            }, children: _jsx(Box, { sx: { ...style }, children: _jsxs(Paper, { elevation: 1, children: [_jsx(Paper, { elevation: 2, children: ConditionalRender(_jsx(ProviderDataChart, { onNoDataAvailable: () => setNoData(true), provider: config.provider?.name }), config.provider !== undefined) }), ConditionalRender(_jsx(_Fragment, { children: _jsxs(Alert, { severity: "warning", children: [_jsx(AlertTitle, { children: "No data available" }), generateNoDataAvailableString(config.provider?.name ?? ''), _jsx("a", { href: "https://discord.com/invite/jWPcsTzpCT", children: "Discord" }), ".", _jsx("br", {}), _jsx("a", { href: "https://github.com/Mister-Eth/ETHTPS/tree/dev/ETHTPS.API/ETHTPS.Services.Ethereum", children: "See a list of available integrations here" }), "."] }) }), noData)] }) }) }) }));
}
