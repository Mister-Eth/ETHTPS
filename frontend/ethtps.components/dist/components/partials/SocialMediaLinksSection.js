import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup } from '@mui/material';
import { GitHub, Twitter } from '@mui/icons-material';
import { DiscordIcon } from '../icons/DiscordIcon';
import React from 'react';
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon';
export function SocialMediaLinksSection() {
    return (_jsx(React.Fragment, { children: _jsxs(ButtonGroup, { sx: { float: 'right' }, children: [_jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(GitHub, {}), href: 'https://github.com/Mister-Eth/ETHTPS', text: 'Github repository' }), _jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(Twitter, {}), href: 'https://twitter.com/ethtps', text: 'Twitter' }), _jsx(AnimatedLinkButtonWithIcon, { openInNewTab: true, image: _jsx(DiscordIcon, {}), href: 'https://discord.gg/jWPcsTzpCT', text: 'Join our Discord' })] }) }));
}
