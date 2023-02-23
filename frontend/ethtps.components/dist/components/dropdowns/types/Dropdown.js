"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = void 0;
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const ButtonGroup_1 = __importDefault(require("@mui/material/ButtonGroup"));
const ArrowDropDown_1 = __importDefault(require("@mui/icons-material/ArrowDropDown"));
const ClickAwayListener_1 = __importDefault(require("@mui/material/ClickAwayListener"));
const Grow_1 = __importDefault(require("@mui/material/Grow"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Popper_1 = __importDefault(require("@mui/material/Popper"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const MenuList_1 = __importDefault(require("@mui/material/MenuList"));
const material_1 = require("@mui/material");
const Types_1 = require("../../../Types");
function Dropdown(configuration) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleMenuItemClick = (value, index) => {
        var _a, _b;
        if (index === selectedIndex)
            return;
        setOpen(false);
        setSelectedIndex(index);
        if ((_a = configuration.selection) === null || _a === void 0 ? void 0 : _a.callback)
            (_b = configuration.selection) === null || _b === void 0 ? void 0 : _b.callback(configuration.conversionFunction(value));
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
    return (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(ButtonGroup_1.default, Object.assign({}, hoverEvents, { variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: { cursor: 'pointer' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "top", title: configuration.hoverText }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ color: 'primary', endIcon: (0, jsx_runtime_1.jsx)(ArrowDropDown_1.default, {}), onClick: handleToggle }, { children: configuration.options[selectedIndex] })) })) })), (0, jsx_runtime_1.jsx)(Popper_1.default, Object.assign({ sx: {
                    zIndex: 1,
                }, open: open, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: ({ TransitionProps, placement }) => ((0, jsx_runtime_1.jsx)(Grow_1.default, Object.assign({}, TransitionProps, { style: {
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                    } }, { children: (0, jsx_runtime_1.jsx)(Paper_1.default, { children: (0, jsx_runtime_1.jsx)(ClickAwayListener_1.default, Object.assign({ onClickAway: handleClose }, { children: (0, jsx_runtime_1.jsx)(MenuList_1.default, Object.assign({ id: "split-button-menu", autoFocusItem: true }, { children: configuration.options.map((value, index) => ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "right", title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: configuration.uiFormatFunction !==
                                            undefined
                                            ? configuration.uiFormatFunction(configuration.conversionFunction(value))
                                            : value }) }, { children: (0, react_1.createElement)(MenuItem_1.default, Object.assign({}, hoverEvents, { key: value, selected: index === selectedIndex, onClick: () => handleMenuItemClick(value, index) }), value) }), value))) })) })) }) }))) }))] }), !configuration.hidden);
}
exports.Dropdown = Dropdown;
