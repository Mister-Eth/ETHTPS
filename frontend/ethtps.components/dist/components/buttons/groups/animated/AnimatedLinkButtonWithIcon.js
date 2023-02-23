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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Tooltip, Typography } from '@mui/material';
import { openNewTab } from '../../../../LinksHelper';
import React from 'react';
// No animation YET
export function AnimatedLinkButtonWithIcon(props) {
    var handleClick = function () {
        if (props.openInNewTab) {
            openNewTab(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return (_jsxs(React.Fragment, { children: [_jsx(Tooltip, __assign({ arrow: true, title: _jsx(Typography, { children: props.text }) }, { children: _jsx(IconButton, __assign({ onClick: handleClick, color: 'primary' }, { children: props.image })) })), props.showText ? _jsx(Typography, { children: props.text }) : _jsx(_Fragment, {})] }));
}
//# sourceMappingURL=AnimatedLinkButtonWithIcon.js.map