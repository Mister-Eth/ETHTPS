"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidechainToggleButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const LiveDataSlice_1 = require("ethtps.data/dist/slices/LiveDataSlice");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ethtps_data_1 = require("ethtps.data");
function SidechainToggleButton(config) {
    const [on, setOn] = (0, react_1.useState)(config.defaultIncluded);
    const toggle = () => {
        if (config.toggled) {
            config.toggled(!on);
            ethtps_data_1.store.dispatch((0, LiveDataSlice_1.setIncludeSidechains)(!on));
        }
        setOn(!on);
    };
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, title: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: ["Sidechains are ", on ? 'included' : 'excluded', ". Click to", on ? 'exclude' : 'include'] }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: toggle }, { children: on ? (0, jsx_runtime_1.jsx)(icons_material_1.Link, { color: "primary" }) : (0, jsx_runtime_1.jsx)(icons_material_1.LinkOff, {}) })) })) }));
}
exports.SidechainToggleButton = SidechainToggleButton;
