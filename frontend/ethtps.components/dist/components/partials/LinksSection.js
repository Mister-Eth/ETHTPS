"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const Popper_1 = __importDefault(require("@mui/material/Popper"));
const react_1 = require("react");
const MenuItemWithIcon_1 = require("../menu item/MenuItemWithIcon");
const react_2 = __importDefault(require("react"));
function LinksSection() {
    const [popperOpen, setPopperOpen] = (0, react_1.useState)(false);
    const anchorRef = (0, react_1.useRef)(null);
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
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.ButtonGroup, Object.assign({ ref: anchorRef, sx: { float: 'center' } }, { children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout }, { children: popperOpen ? (0, jsx_runtime_1.jsx)(icons_material_1.RocketLaunchOutlined, {}) : (0, jsx_runtime_1.jsx)(icons_material_1.RocketOutlined, {}) })), (0, jsx_runtime_1.jsx)(Popper_1.default, Object.assign({ open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: ({ TransitionProps, placement }) => ((0, jsx_runtime_1.jsx)(material_1.Grow, Object.assign({}, TransitionProps, { style: {
                            transformOrigin: placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Paper, { children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, Object.assign({ onClickAway: () => setPopperOpen(false) }, { children: (0, jsx_runtime_1.jsxs)(material_1.MenuList, Object.assign({ autoFocusItem: true, onMouseOverCapture: clearHoverAwayTimeout, onMouseOutCapture: setHoverAwayTimeout }, { children: [(0, jsx_runtime_1.jsx)(MenuItemWithIcon_1.MenuItemWithIcon, { myKey: 2, openInNewTab: true, image: (0, jsx_runtime_1.jsx)(icons_material_1.Api, {}), href: 'https://api.ethtps.info/', text: 'API' }), (0, jsx_runtime_1.jsx)(MenuItemWithIcon_1.MenuItemWithIcon, { myKey: 1, openInNewTab: false, image: (0, jsx_runtime_1.jsx)(icons_material_1.DataArray, {}), href: 'https://api.ethtps.info/API/v2/AllData', text: 'Download data' }), (0, jsx_runtime_1.jsx)(MenuItemWithIcon_1.MenuItemWithIcon, { myKey: 4, openInNewTab: true, image: (0, jsx_runtime_1.jsx)(icons_material_1.QuestionMarkOutlined, {}), href: 'https://v1.ethtps.info', text: 'Old version' })] })) })) }) }))) }))] })) }));
}
exports.LinksSection = LinksSection;
