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
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Tooltip, Typography } from '@mui/material';
import { ConditionalRender } from '../../../Types';
export function Dropdown(configuration) {
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var anchorRef = React.useRef(null);
    var _b = React.useState(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var handleMenuItemClick = function (value, index) {
        var _a, _b;
        if (index === selectedIndex)
            return;
        setOpen(false);
        setSelectedIndex(index);
        if ((_a = configuration.selection) === null || _a === void 0 ? void 0 : _a.callback)
            (_b = configuration.selection) === null || _b === void 0 ? void 0 : _b.callback(configuration.conversionFunction(value));
    };
    var handleToggle = function () {
        setOpen(function (prevOpen) { return !prevOpen; });
    };
    var handleClose = function (event) {
        if (anchorRef.current &&
            anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    var hoverAwayRef;
    var clearHoverAwayTimeout = function () {
        clearInterval(hoverAwayRef);
        setOpen(true);
    };
    var setHoverAwayTimeout = function () {
        hoverAwayRef = setTimeout(function () {
            setOpen(false);
        }, 200);
    };
    var hoverEvents = {
        onMouseOverCapture: clearHoverAwayTimeout,
        onClick: handleToggle,
        onMouseOutCapture: setHoverAwayTimeout,
        onMouseDownCapture: function () { return setOpen(true); },
    };
    return ConditionalRender(_jsxs(React.Fragment, { children: [_jsx(ButtonGroup, __assign({}, hoverEvents, { variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: { cursor: 'pointer' } }, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "top", title: configuration.hoverText }, { children: _jsx(Button, __assign({ color: 'primary', endIcon: _jsx(ArrowDropDownIcon, {}), onClick: handleToggle }, { children: configuration.options[selectedIndex] })) })) })), _jsx(Popper, __assign({ sx: {
                    zIndex: 1,
                }, open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: function (_a) {
                    var TransitionProps = _a.TransitionProps, placement = _a.placement;
                    return (_jsx(Grow, __assign({}, TransitionProps, { style: {
                            transformOrigin: placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                        } }, { children: _jsx(Paper, { children: _jsx(ClickAwayListener, __assign({ onClickAway: handleClose }, { children: _jsx(MenuList, __assign({ id: "split-button-menu", autoFocusItem: true }, { children: configuration.options.map(function (value, index) { return (_jsx(Tooltip, __assign({ arrow: true, placement: "right", title: _jsx(Typography, { children: configuration.uiFormatFunction !==
                                                undefined
                                                ? configuration.uiFormatFunction(configuration.conversionFunction(value))
                                                : value }) }, { children: _createElement(MenuItem, __assign({}, hoverEvents, { key: value, selected: index === selectedIndex, onClick: function () {
                                                return handleMenuItemClick(value, index);
                                            } }), value) }), value)); }) })) })) }) })));
                } }))] }), !configuration.hidden);
}
//# sourceMappingURL=Dropdown.js.map