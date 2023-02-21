import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup, ClickAwayListener, Grow, IconButton, MenuList, Paper, } from '@mui/material';
import { Api, DataArray, RocketLaunchOutlined, RocketOutlined, QuestionMarkOutlined, } from '@mui/icons-material';
import Popper from '@mui/material/Popper';
import { Fragment, useRef, useState } from 'react';
import { MenuItemWithIcon } from '../menu item/MenuItemWithIcon';
export function LinksSection() {
    const [popperOpen, setPopperOpen] = useState(false);
    const anchorRef = useRef(null);
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
    return (_jsx(Fragment, { children: _jsxs(ButtonGroup, { ref: anchorRef, sx: { float: 'center' }, children: [_jsx(IconButton, { onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout, children: popperOpen ? _jsx(RocketLaunchOutlined, {}) : _jsx(RocketOutlined, {}) }), _jsx(Popper, { open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true, children: ({ TransitionProps, placement }) => (_jsx(Grow, { ...TransitionProps, style: {
                            transformOrigin: placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                        }, children: _jsx(Paper, { children: _jsx(ClickAwayListener, { onClickAway: () => setPopperOpen(false), children: _jsxs(MenuList, { autoFocusItem: true, onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout, children: [_jsx(MenuItemWithIcon, { myKey: 2, openInNewTab: true, image: _jsx(Api, {}), href: 'https://api.ethtps.info/', text: 'API' }), _jsx(MenuItemWithIcon, { myKey: 1, openInNewTab: false, image: _jsx(DataArray, {}), href: 'https://api.ethtps.info/API/v2/AllData', text: 'Download data' }), _jsx(MenuItemWithIcon, { myKey: 4, openInNewTab: true, image: _jsx(QuestionMarkOutlined, {}), href: 'https://v1.ethtps.info', text: 'Old version' })] }) }) }) })) })] }) }));
}
