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
import { ButtonGroup } from '@mui/material';
import { GitHub, Twitter } from '@mui/icons-material';
import { DiscordIcon } from '../icons/DiscordIcon';
import React from 'react';
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon';
export function SocialMediaLinksSection() {
    return (_jsx(React.Fragment, { children: _jsxs(ButtonGroup, __assign({ sx: { float: 'right' } }, { children: [_jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(GitHub, {}), href: 'https://github.com/Mister-Eth/ETHTPS', text: 'Github repository' }), _jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(Twitter, {}), href: 'https://twitter.com/ethtps', text: 'Twitter' }), _jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(DiscordIcon, {}), href: 'https://discord.gg/jWPcsTzpCT', text: 'Join our Discord' })] })) }));
}
//# sourceMappingURL=SocialMediaLinksSection.js.map