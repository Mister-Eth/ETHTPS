import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { MobiledataOff, SyncAlt } from '@mui/icons-material';
import { useAppSelector } from 'ethtps.data';
export function WebsocketStatusPartial() {
    const [connected, setConnected] = useState(false);
    const status = useAppSelector((state) => state.websockets.isConnected);
    useEffect(() => {
        setConnected(status);
    }, [status]);
    return (_jsx(Fragment, { children: _jsxs("div", { style: {
                position: 'absolute',
                cursor: 'default',
                marginLeft: '1em',
                marginTop: '1em',
            }, className: connected ? 'disappear box' : 'appear box', children: [connected ? (_jsx(SyncAlt, { color: connected ? 'primary' : 'error' })) : (_jsx(MobiledataOff, { color: connected ? 'primary' : 'error' })), _jsx(Typography, { color: connected ? 'primary' : 'error', className: "inline", children: connected ? 'Connected' : 'Disconnected' })] }) }));
}
