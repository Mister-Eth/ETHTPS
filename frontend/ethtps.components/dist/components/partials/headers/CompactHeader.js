import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SocialMediaLinksSection } from '../SocialMediaLinksSection';
import { Container } from '@mui/material';
import { Logo } from '../Logo';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { LinksSection } from '../LinksSection';
import React from 'react';
export default function CompactHeader() {
    return (_jsx(React.Fragment, { children: _jsx(AppBar, { position: 'sticky', enableColorOnDark: true, color: 'default', children: _jsx(Toolbar, { children: _jsxs(Container, { children: [_jsx(Logo, {}), _jsx(LinksSection, {}), _jsx(SocialMediaLinksSection, {})] }) }) }) }));
}
