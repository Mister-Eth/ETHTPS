import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useState } from 'react';
import { ConditionalRender } from '../../Types';
import { Box } from '@mui/system';
export function SkeletonWithTooltip(config) {
    const message = config.text ?? 'Loading...';
    const [delay, setDelay] = useState(config.randomDelay);
    if (config.randomDelay !== undefined) {
        if (config.randomDelay === true) {
            setTimeout(() => setDelay(false), Math.random() * 250);
        }
    }
    return (_jsx(_Fragment, { children: _jsx(Fragment, { children: ConditionalRender(_jsx(Tooltip, { arrow: true, title: _jsx(Typography, { children: message }), children: _jsx(Box, { sx: { width: '90%' }, children: _jsx(Skeleton, { className: 'w-hundred', variant: config.rectangular
                            ? 'rectangular'
                            : undefined, sx: {
                            backgroundColor: themeProvider.getCurrentTheme().palette
                                .primary.main,
                            height: config.rectangular ? 50 : undefined,
                        } }) }) }), !delay) }) }));
}
