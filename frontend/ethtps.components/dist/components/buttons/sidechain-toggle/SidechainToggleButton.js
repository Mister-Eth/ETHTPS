import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, LinkOff } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { setIncludeSidechains } from 'ethtps.data/dist/slices/LiveDataSlice';
import { useState } from 'react';
import React from 'react';
import { store } from 'ethtps.data';
export function SidechainToggleButton(config) {
    const [on, setOn] = useState(config.defaultIncluded);
    const toggle = () => {
        if (config.toggled) {
            config.toggled(!on);
            store.dispatch(setIncludeSidechains(!on));
        }
        setOn(!on);
    };
    return (_jsx(React.Fragment, { children: _jsx(Tooltip, { arrow: true, title: _jsxs(Typography, { children: ["Sidechains are ", on ? 'included' : 'excluded', ". Click to", on ? 'exclude' : 'include'] }), children: _jsx(IconButton, { onClick: toggle, children: on ? _jsx(Link, { color: "primary" }) : _jsx(LinkOff, {}) }) }) }));
}
