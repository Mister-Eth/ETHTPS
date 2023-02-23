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
import { addDays } from 'date-fns';
import { useState, useEffect } from 'react';
import { Chip, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, } from '@mui/material';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
export function DateRangeSelectorDropdown(config) {
    var _a, _b;
    var _c = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]), state = _c[0], setState = _c[1];
    var _d = useState(!config.hidden), popperOpen = _d[0], setPopperOpen = _d[1];
    useEffect(function () {
        setPopperOpen(!config.hidden);
    }, [config.hidden]);
    var anchorRef = React.useRef(null);
    var handleToggle = function () {
        setPopperOpen(function (prevOpen) { return !prevOpen; });
    };
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
    var hoverEvents = config.hidden
        ? {}
        : {
            onMouseOverCapture: clearHoverAwayTimeout,
            onClick: handleToggle,
            onMouseOutCapture: setHoverAwayTimeout,
            onMouseDownCapture: function () { return setPopperOpen(true); },
        };
    return (_jsxs(React.Fragment, { children: [_jsx(ButtonGroup, __assign({}, hoverEvents, { variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: {
                    cursor: 'pointer',
                    opacity: config.hidden ? 0 : 1,
                } }, { children: _jsx(Chip, { color: "primary", label: state === undefined
                        ? 'Range'
                        : ((_a = state[0].startDate) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) +
                            ' - ' +
                            ((_b = state[0].endDate) === null || _b === void 0 ? void 0 : _b.toLocaleDateString()), variant: "outlined" }) })), _jsx(Popper, __assign({ sx: {
                    zIndex: 1,
                }, open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: function (_a) {
                    var TransitionProps = _a.TransitionProps, placement = _a.placement;
                    return (_jsx(Grow, __assign({}, TransitionProps, { style: {
                            transformOrigin: placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                        } }, { children: _jsx(Paper, { children: _jsx(ClickAwayListener, __assign({ onClickAway: function () { return setPopperOpen(false); } }, { children: _jsx(MenuList, __assign({ id: "split-button-menu", autoFocusItem: true }, { children: _jsx(MenuItem, __assign({}, hoverEvents, { onClick: undefined }, { children: "range" })) })) })) }) })));
                } }))] }));
}
//# sourceMappingURL=DateRangeSelectorDropdown.js.map