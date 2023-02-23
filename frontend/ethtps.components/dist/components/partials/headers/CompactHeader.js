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
import { SocialMediaLinksSection } from '../SocialMediaLinksSection';
import { Container } from '@mui/material';
import { Logo } from '../Logo';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { LinksSection } from '../LinksSection';
import React from 'react';
export function CompactHeader() {
    return (_jsx(React.Fragment, { children: _jsx(AppBar, __assign({ position: 'sticky', enableColorOnDark: true, color: 'default' }, { children: _jsx(Toolbar, { children: _jsxs(Container, { children: [_jsx(Logo, {}), _jsx(LinksSection, {}), _jsx(SocialMediaLinksSection, {})] }) }) })) }));
}
//# sourceMappingURL=CompactHeader.js.map