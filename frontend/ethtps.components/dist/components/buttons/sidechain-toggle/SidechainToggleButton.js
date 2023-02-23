var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, LinkOff } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { setIncludeSidechains } from 'ethtps.data/dist/slices/LiveDataSlice';
import { useState } from 'react';
import React from 'react';
import { store } from 'ethtps.data';
export function SidechainToggleButton(config) {
    var _a = useState(config.defaultIncluded), on = _a[0], setOn = _a[1];
    var toggle = function () {
        if (config.toggled) {
            config.toggled(!on);
            store.dispatch(setIncludeSidechains(!on));
        }
        setOn(!on);
    };
    return (_jsx(React.Fragment, { children: _jsx(Tooltip, __assign({ arrow: true, title: _jsxs(Typography, { children: ["Sidechains are ", on ? 'included' : 'excluded', ". Click to", on ? 'exclude' : 'include'] }) }, { children: _jsx(IconButton, __assign({ onClick: toggle }, { children: on ? _jsx(Link, { color: "primary" }) : _jsx(LinkOff, {}) })) })) }));
}
//# sourceMappingURL=SidechainToggleButton.js.map