"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiProviderVSIXChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Types_1 = require("../../Types");
const react_2 = __importDefault(require("react"));
function MultiProviderVSIXChart() {
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(0);
    const containerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container", ref: containerRef }, { children: (0, Types_1.ConditionalSkeletonRender)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), containerWidth > 0) })) }));
}
exports.MultiProviderVSIXChart = MultiProviderVSIXChart;
