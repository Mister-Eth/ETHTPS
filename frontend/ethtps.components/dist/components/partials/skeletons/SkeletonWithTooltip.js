"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeletonWithTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const Types_1 = require("../../../Types");
const system_1 = require("@mui/system");
const react_2 = __importDefault(require("react"));
function SkeletonWithTooltip(config) {
    var _a;
    const message = (_a = config.text) !== null && _a !== void 0 ? _a : 'Loading...';
    const [delay, setDelay] = (0, react_1.useState)(config.randomDelay);
    if (config.randomDelay !== undefined) {
        if (config.randomDelay === true) {
            setTimeout(() => setDelay(false), Math.random() * 250);
        }
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: message }) }, { children: (0, jsx_runtime_1.jsx)(system_1.Box, Object.assign({ sx: { width: '90%' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Skeleton, { className: 'w-hundred', variant: config.rectangular
                            ? 'rectangular'
                            : undefined }) })) })), !delay) }) }));
}
exports.SkeletonWithTooltip = SkeletonWithTooltip;
