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
import { ConditionalRender } from '../../Types';
import { QuestionMark } from '@mui/icons-material';
const getBeginIcon = (beginiconName) => {
    switch (beginiconName) {
        default:
            return _jsx(QuestionMark, {});
    }
};
export function Dropdown(configuration) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleMenuItemClick = (value, index) => {
        if (index === selectedIndex)
            return;
        setOpen(false);
        setSelectedIndex(index);
        if (configuration.selectionChanged !== undefined)
            configuration.selectionChanged(configuration.conversionFunction(value));
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current &&
            anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    let hoverAwayRef;
    const clearHoverAwayTimeout = () => {
        clearInterval(hoverAwayRef);
        setOpen(true);
    };
    const setHoverAwayTimeout = () => {
        hoverAwayRef = setTimeout(() => {
            setOpen(false);
        }, 200);
    };
    const hoverEvents = {
        onMouseOverCapture: clearHoverAwayTimeout,
        onClick: handleToggle,
        onMouseOutCapture: setHoverAwayTimeout,
        onMouseDownCapture: () => setOpen(true),
    };
    return ConditionalRender(_jsxs(React.Fragment, { children: [_jsx(ButtonGroup, { ...hoverEvents, variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: { cursor: 'pointer' }, children: _jsx(Tooltip, { arrow: true, placement: "top", title: configuration.hoverText, children: _jsx(Button, { color: 'primary', endIcon: _jsx(ArrowDropDownIcon, {}), onClick: handleToggle, children: configuration.options[selectedIndex] }) }) }), _jsx(Popper, { sx: {
                    zIndex: 1,
                }, open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, children: ({ TransitionProps, placement }) => (_jsx(Grow, { ...TransitionProps, style: {
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                    }, children: _jsx(Paper, { children: _jsx(ClickAwayListener, { onClickAway: handleClose, children: _jsx(MenuList, { id: "split-button-menu", autoFocusItem: true, children: configuration.options.map((value, index) => (_jsx(Tooltip, { arrow: true, placement: "right", title: _jsx(Typography, { children: configuration.uiFormatFunction !==
                                            undefined
                                            ? configuration.uiFormatFunction(configuration.conversionFunction(value))
                                            : value }), children: _createElement(MenuItem, { ...hoverEvents, key: value, selected: index === selectedIndex, onClick: () => handleMenuItemClick(value, index) }, value) }, value))) }) }) }) })) })] }), !configuration.hidden);
}
