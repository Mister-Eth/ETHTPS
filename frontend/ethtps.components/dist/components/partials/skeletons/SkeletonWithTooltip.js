import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { ConditionalRender } from '../../../Types';
import { Box } from '@mui/system';
import React from 'react';
export function SkeletonWithTooltip(config) {
    const message = config.text ?? 'Loading...';
    const [delay, setDelay] = useState(config.randomDelay);
    if (config.randomDelay !== undefined) {
        if (config.randomDelay === true) {
            setTimeout(() => setDelay(false), Math.random() * 250);
        }
    }
    return (_jsx(_Fragment, { children: _jsx(React.Fragment, { children: ConditionalRender(_jsx(Tooltip, { arrow: true, title: _jsx(Typography, { children: message }), children: _jsx(Box, { sx: { width: '90%' }, children: _jsx(Skeleton, { className: 'w-hundred', variant: config.rectangular
                            ? 'rectangular'
                            : undefined }) }) }), !delay) }) }));
}
