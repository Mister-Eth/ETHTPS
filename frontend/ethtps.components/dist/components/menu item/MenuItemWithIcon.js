import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mui/material';
import { AnimatedLinkButtonWithIcon } from '../buttons/AnimatedLinkButtonWithIcon';
import { openNewTab } from '../../LinksHelper';
import Fragment from 'react';
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
    return (_jsx(Fragment, { children: _jsx(MenuItem, { onMouseOverCapture: props.onMouseOverCapture, onClick: handleClick, children: _jsx(AnimatedLinkButtonWithIcon, { showText: true, openInNewTab: false, image: props.image, href: props.href, text: props.text }) }, props.myKey) }));
}
