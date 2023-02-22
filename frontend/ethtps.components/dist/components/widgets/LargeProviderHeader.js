import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { inline, uniform } from 'ethtps.data';
import React from 'react';
export function LargeProviderHeader(config) {
    return (_jsx(React.Fragment, { children: _jsxs("div", { className: 'box', style: { float: 'left' }, children: [_jsx("img", { alt: `${config.provider?.name} image`, src: `/provider-icons/${config.provider?.name}.png`, ...inline, ...uniform('2em') }), _jsx(Typography, { ...inline, sx: {
                        fontWeight: 'bold',
                        fontSize: '2em',
                        marginLeft: '0.2em',
                    }, children: config.provider?.name })] }) }));
}
