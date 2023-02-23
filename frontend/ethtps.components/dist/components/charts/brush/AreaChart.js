"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const group_1 = require("@visx/group");
const shape_1 = require("@visx/shape");
const axis_1 = require("@visx/axis");
const gradient_1 = require("@visx/gradient");
const curve_1 = require("@visx/curve");
// Initialize some variables
const axisColor = '#fff';
const axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};
const axisLeftTickLabelProps = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
    fill: axisColor,
};
function AreaChart({ data, gradientColor, width, yMax, margin, xScale, yScale, hideBottomAxis = false, hideLeftAxis = false, top, left, children, }) {
    if (width < 10)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(group_1.Group, Object.assign({ left: left || margin.left, top: top || margin.top }, { children: [(0, jsx_runtime_1.jsx)(gradient_1.LinearGradient, { id: "gradient", from: gradientColor, fromOpacity: 1, to: gradientColor, toOpacity: 0.2 }), (0, jsx_runtime_1.jsx)(shape_1.AreaClosed, { data: data, x: (d) => xScale(d.x) || new Date().getTime(), y: (d) => yScale(d.y) || 0, yScale: yScale, strokeWidth: 1, stroke: "url(#gradient)", fill: "url(#gradient)", curve: curve_1.curveMonotoneX }), !hideBottomAxis && ((0, jsx_runtime_1.jsx)(axis_1.AxisBottom, { top: yMax, scale: xScale, numTicks: width > 520 ? 10 : 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: () => axisBottomTickLabelProps })), !hideLeftAxis && ((0, jsx_runtime_1.jsx)(axis_1.AxisLeft, { scale: yScale, numTicks: 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: () => axisLeftTickLabelProps })), children] })) }));
}
exports.default = AreaChart;
