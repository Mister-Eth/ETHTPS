import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Tooltip, Typography } from '@mui/material';
import { openNewTab } from '../../LinksHelper';
import { Fragment } from 'react';
// No animation YET
export function AnimatedLinkButtonWithIcon(props) {
    const handleClick = () => {
        if (props.openInNewTab) {
            openNewTab(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return (_jsxs(Fragment, { children: [_jsx(Tooltip, { arrow: true, title: _jsx(Typography, { children: props.text }), children: _jsx(IconButton, { onClick: handleClick, color: 'primary', children: props.image }) }), props.showText ? _jsx(Typography, { children: props.text }) : _jsx(_Fragment, {})] }));
}
