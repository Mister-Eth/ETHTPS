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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, AlertTitle, Box, Modal, Paper } from '@mui/material';
import { ProviderDataChart } from '../../../charts/provider/ProviderDataChart';
import { ConditionalRender } from '../../../../Types';
import { useState } from 'react';
import React from 'react';
import { createHandlerFromCallback } from 'ethtps.data';
var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px line #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
var generateNoDataAvailableString = function (provider) {
    return "There is no data available for ".concat(provider, ". If you're seeing this, it probably means there is no chain explorer integration available for ").concat(provider, " or that we haven't yet synchronized the data for ").concat(provider, " after the update. Please try again later. If you still don't see any data after a while, drop us a message on ");
};
export function ProviderModal(config) {
    var _a, _b, _c;
    var _d = useState(false), noData = _d[0], setNoData = _d[1];
    var noDataHandler = createHandlerFromCallback(function (newValue) {
        setNoData(true);
        console.debug('No data available for ' + newValue);
    });
    return (_jsx(React.Fragment, { children: _jsx(Modal, __assign({ keepMounted: false, open: config.open, "aria-labelledby": "parent-modal-title", "aria-describedby": "parent-modal-description", onClose: function () {
                setNoData(false);
                config.onClose();
            } }, { children: _jsx(Box, __assign({ sx: __assign({}, style) }, { children: _jsxs(Paper, __assign({ elevation: 1 }, { children: [_jsx(Paper, __assign({ elevation: 2 }, { children: ConditionalRender(_jsx(ProviderDataChart, { onNoDataAvailable: noDataHandler, provider: {
                                    provider: (_a = config.provider) === null || _a === void 0 ? void 0 : _a.name,
                                } }), config.provider !== undefined) })), ConditionalRender(_jsx(_Fragment, { children: _jsxs(Alert, __assign({ severity: "warning" }, { children: [_jsx(AlertTitle, { children: "No data available" }), generateNoDataAvailableString((_c = (_b = config.provider) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : ''), _jsx("a", __assign({ href: "https://discord.com/invite/jWPcsTzpCT" }, { children: "Discord" })), ".", _jsx("br", {}), _jsx("a", __assign({ href: "https://github.com/Mister-Eth/ETHTPS/tree/dev/ETHTPS.API/ETHTPS.Services.Ethereum" }, { children: "See a list of available integrations here" })), "."] })) }), noData)] })) })) })) }));
}
//# sourceMappingURL=ProviderModal.js.map