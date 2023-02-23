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
import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@mui/material';
import React from 'react';
import { openNewTab } from '../../LinksHelper';
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon';
// No animation YET
export function MenuItemWithIcon(props) {
    var handleClick = function () {
        if (props.openInNewTab) {
            openNewTab(props.href);
        }
        else {
            window.location.href = props.href;
        }
    };
    return (_jsx(React.Fragment, { children: _jsx(MenuItem, __assign({ onMouseOverCapture: props.onMouseOverCapture, onClick: handleClick }, { children: _jsx(AnimatedLinkButtonWithIcon, { showText: true, openInNewTab: false, image: props.image, href: props.href, text: props.text }) }), props.myKey) }));
}
//# sourceMappingURL=MenuItemWithIcon.js.map