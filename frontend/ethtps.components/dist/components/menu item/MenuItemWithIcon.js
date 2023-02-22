import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mui/material';
import React from 'react';
import { openNewTab } from '../../LinksHelper';
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon';
// No animation YET
export function MenuItemWithIcon(props) {
    const handleClick = () => {
        if (props.openInNewTab) {
            openNewTab(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return (_jsx(React.Fragment, { children: _jsx(MenuItem, { onMouseOverCapture: props.onMouseOverCapture, onClick: handleClick, children: _jsx(AnimatedLinkButtonWithIcon, { showText: true, openInNewTab: false, image: props.image, href: props.href, text: props.text }) }, props.myKey) }));
}
