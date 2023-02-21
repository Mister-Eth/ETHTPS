import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import React from 'react';
export function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx(React.Fragment, { children: _jsx("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, ...other, children: value === index && (_jsx(Box, { sx: { p: 3 }, children: _jsx(Typography, { children: children }) })) }) }));
}
