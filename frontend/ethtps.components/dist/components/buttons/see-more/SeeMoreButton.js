"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeeMoreButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
function SeeMoreButton(events) {
    const [expand, setExpand] = (0, react_1.useState)(true);
    const onClick = () => {
        if (expand) {
            if (events.onSeeMore !== undefined) {
                events.onSeeMore();
            }
        }
        else {
            if (events.onSeeLess !== undefined) {
                events.onSeeLess();
            }
        }
        setExpand(!expand);
    };
    const getIcon = () => (expand ? (0, jsx_runtime_1.jsx)(icons_material_1.ArrowDownward, {}) : (0, jsx_runtime_1.jsx)(icons_material_1.ArrowUpward, {}));
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ disabled: !events.enabled, variant: "text", sx: {
                width: '100%',
            }, startIcon: getIcon(), endIcon: getIcon(), onClick: () => onClick() }, { children: ["See ", expand ? 'more' : 'less'] })) }));
}
exports.SeeMoreButton = SeeMoreButton;
