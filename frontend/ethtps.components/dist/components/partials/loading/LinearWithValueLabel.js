import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function LinearProgressWithLabel(props) {
    return (_jsx(React.Fragment, { children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(Box, { sx: { width: '100%', mr: 1 }, children: _jsx(LinearProgress, { variant: "determinate", ...props }) }), _jsx(Box, { sx: { minWidth: 35 }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: `${Math.round(props.value)}%` }) })] }) }));
}
export default function LinearWithValueLabel(config) {
    return (_jsx(React.Fragment, { children: _jsx(Box, { sx: { width: '100%' }, children: _jsx(LinearProgressWithLabel, { value: config.progress }) }) }));
}
