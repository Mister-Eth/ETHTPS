import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
export function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (_jsx(Fragment, { children: _jsx("div", { role: "tabpanel", hidden: value !== index, id: `simple-tabpanel-${index}`, "aria-labelledby": `simple-tab-${index}`, ...other, children: value === index && (_jsx(Box, { sx: { p: 3 }, children: _jsx(Typography, { children: children }) })) }) }));
}
