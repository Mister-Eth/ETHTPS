"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeSelectorDropdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const react_date_range_1 = require("react-date-range");
const material_1 = require("@mui/material");
const react_2 = __importDefault(require("react"));
const ButtonGroup_1 = __importDefault(require("@mui/material/ButtonGroup"));
function DateRangeSelectorDropdown(config) {
    var _a, _b;
    const [state, setState] = (0, react_1.useState)([
        {
            startDate: new Date(),
            endDate: (0, date_fns_1.addDays)(new Date(), 7),
            key: 'selection',
        },
    ]);
    const [popperOpen, setPopperOpen] = (0, react_1.useState)(!config.hidden);
    (0, react_1.useEffect)(() => {
        setPopperOpen(!config.hidden);
    }, [config.hidden]);
    const anchorRef = react_2.default.useRef(null);
    const handleToggle = () => {
        setPopperOpen((prevOpen) => !prevOpen);
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
    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(ButtonGroup_1.default, Object.assign({}, hoverEvents, { variant: "outlined", ref: anchorRef, "aria-label": "split button", color: 'primary', sx: {
                    cursor: 'pointer',
                    opacity: config.hidden ? 0 : 1,
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Chip, { color: "primary", label: state === undefined
                        ? 'Range'
                        : ((_a = state[0].startDate) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) +
                            ' - ' +
                            ((_b = state[0].endDate) === null || _b === void 0 ? void 0 : _b.toLocaleDateString()), variant: "outlined" }) })), (0, jsx_runtime_1.jsx)(material_1.Popper, Object.assign({ sx: {
                    zIndex: 1,
                }, open: popperOpen, anchorEl: anchorRef.current, role: undefined, transition: true, disablePortal: true }, { children: ({ TransitionProps, placement }) => ((0, jsx_runtime_1.jsx)(material_1.Grow, Object.assign({}, TransitionProps, { style: {
                        transformOrigin: placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.Paper, { children: (0, jsx_runtime_1.jsx)(material_1.ClickAwayListener, Object.assign({ onClickAway: () => setPopperOpen(false) }, { children: (0, jsx_runtime_1.jsx)(material_1.MenuList, Object.assign({ id: "split-button-menu", autoFocusItem: true }, { children: (0, jsx_runtime_1.jsx)(material_1.MenuItem, Object.assign({}, hoverEvents, { onClick: undefined }, { children: (0, jsx_runtime_1.jsx)(react_date_range_1.DateRange, { onChange: (item) => setState([item.selection]), moveRangeOnFirstSelection: false, months: 1, ranges: state, scroll: { enabled: true }, direction: "vertical" }) })) })) })) }) }))) }))] }));
}
exports.DateRangeSelectorDropdown = DateRangeSelectorDropdown;
