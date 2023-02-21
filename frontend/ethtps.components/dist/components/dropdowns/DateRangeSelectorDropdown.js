import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addDays } from 'date-fns';
import { Fragment, useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { Chip, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, } from '@mui/material';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
export function DateRangeSelectorDropdown(config) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);
    const [popperOpen, setPopperOpen] = useState(!config.hidden);
    useEffect(() => {
        setPopperOpen(!config.hidden);
    }, [config.hidden]);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setPopperOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current &&
            anchorRef.current.contains(event.target)) {
            return;
        }
        setPopperOpen(false);
    };
    let hoverAwayRef;
    const clearHoverAwayTimeout = () => {
        clearInterval(hoverAwayRef);
        setPopperOpen(true);
    };
    const setHoverAwayTimeout = () => {
        hoverAwayRef = setTimeout(() => {
            setPopperOpen(false);
        }, 200);
    };
    const hoverEvents = config.hidden
        ? {}
        : {
            onMouseOverCapture: clearHoverAwayTimeout,
            onClick: handleToggle,
            onMouseOutCapture: setHoverAwayTimeout,
            onMouseDownCapture: () => setPopperOpen(true),
        };
    return (_jsxs(Fragment, { children: [_jsx(ButtonGroup, { ...hoverEvents, variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: {
                    cursor: 'pointer',
                    opacity: config.hidden ? 0 : 1,
                }, children: _jsx(Chip, { color: "primary", label: state === undefined
                        ? 'Range'
                        : state[0].startDate?.toLocaleDateString() +
                            ' - ' +
                            state[0].endDate?.toLocaleDateString(), variant: "outlined" }) }), _jsx(Popper, { sx: {
                    zIndex: 1,
                }, open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, children: ({ TransitionProps, placement }) => (_jsx(Grow, { ...TransitionProps, style: {
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                    }, children: _jsx(Paper, { children: _jsx(ClickAwayListener, { onClickAway: () => setPopperOpen(false), children: _jsx(MenuList, { id: "split-button-menu", autoFocusItem: true, children: _jsx(MenuItem, { ...hoverEvents, onClick: undefined, children: _jsx(DateRange, { onChange: (item) => setState([item.selection]), moveRangeOnFirstSelection: false, months: 1, ranges: state, scroll: { enabled: true }, direction: "vertical" }) }) }) }) }) })) })] }));
}
