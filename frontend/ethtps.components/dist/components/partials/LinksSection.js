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
import { ButtonGroup, ClickAwayListener, Grow, IconButton, MenuList, Paper, } from '@mui/material';
import { Api, DataArray, RocketLaunchOutlined, RocketOutlined, QuestionMarkOutlined, } from '@mui/icons-material';
import Popper from '@mui/material/Popper';
import { useRef, useState } from 'react';
import { MenuItemWithIcon } from '../menu item/MenuItemWithIcon';
import React from 'react';
export function LinksSection() {
    var _a = useState(false), popperOpen = _a[0], setPopperOpen = _a[1];
    var anchorRef = useRef(null);
    var hoverAwayRef;
    var clearHoverAwayTimeout = function () {
        clearInterval(hoverAwayRef);
        setPopperOpen(true);
    };
    var setHoverAwayTimeout = function () {
        hoverAwayRef = setTimeout(function () {
            setPopperOpen(false);
        }, 200);
    };
    return (_jsx(React.Fragment, { children: _jsxs(ButtonGroup, __assign({ ref: anchorRef, sx: { float: 'center' } }, { children: [_jsx(IconButton, __assign({ onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout }, { children: popperOpen ? _jsx(RocketLaunchOutlined, {}) : _jsx(RocketOutlined, {}) })), _jsx(Popper, __assign({ open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: function (_a) {
                        var TransitionProps = _a.TransitionProps, placement = _a.placement;
                        return (_jsx(Grow, __assign({}, TransitionProps, { style: {
                                transformOrigin: placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                            } }, { children: _jsx(Paper, { children: _jsx(ClickAwayListener, __assign({ onClickAway: function () { return setPopperOpen(false); } }, { children: _jsxs(MenuList, __assign({ autoFocusItem: true, onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout }, { children: [_jsx(MenuItemWithIcon, { myKey: 2, openInNewTab: true, image: _jsx(Api, {}), href: 'https://api.ethtps.info/', text: 'API' }), _jsx(MenuItemWithIcon, { myKey: 1, openInNewTab: false, image: _jsx(DataArray, {}), href: 'https://api.ethtps.info/API/v2/AllData', text: 'Download data' }), _jsx(MenuItemWithIcon, { myKey: 4, openInNewTab: true, image: _jsx(QuestionMarkOutlined, {}), href: 'https://v1.ethtps.info', text: 'Old version' })] })) })) }) })));
                    } }))] })) }));
}
//# sourceMappingURL=LinksSection.js.map