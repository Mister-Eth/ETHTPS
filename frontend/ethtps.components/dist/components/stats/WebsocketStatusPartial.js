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
import { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { MobiledataOff, SyncAlt } from '@mui/icons-material';
import { useAppSelector } from 'ethtps.data';
import React from 'react';
export function WebsocketStatusPartial() {
    var _a = useState(false), connected = _a[0], setConnected = _a[1];
    var status = useAppSelector(function (state) { return state.websockets.isConnected; });
    useEffect(function () {
        setConnected(status);
    }, [status]);
    return (_jsx(React.Fragment, { children: _jsxs("div", __assign({ style: {
                position: 'absolute',
                cursor: 'default',
                marginLeft: '1em',
                marginTop: '1em',
            }, className: connected ? 'disappear box' : 'appear box' }, { children: [connected ? (_jsx(SyncAlt, { color: connected ? 'primary' : 'error' })) : (_jsx(MobiledataOff, { color: connected ? 'primary' : 'error' })), _jsx(Typography, __assign({ color: connected ? 'primary' : 'error', className: "inline" }, { children: connected ? 'Connected' : 'Disconnected' }))] })) }));
}
//# sourceMappingURL=WebsocketStatusPartial.js.map