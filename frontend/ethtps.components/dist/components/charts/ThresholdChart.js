"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThresholdChart = exports.background = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const group_1 = require("@visx/group");
const curve_1 = require("@visx/curve");
const shape_1 = require("@visx/shape");
const threshold_1 = require("@visx/threshold");
const scale_1 = require("@visx/scale");
const axis_1 = require("@visx/axis");
const grid_1 = require("@visx/grid");
const cityTemperature_1 = __importDefault(require("@visx/mock-data/lib/mocks/cityTemperature"));
exports.background = '#f3f3f3';
// accessors
const date = (d) => new Date(d.date).valueOf();
const ny = (d) => Number(d['New York']);
const sf = (d) => Number(d['San Francisco']);
// scales
const timeScale = (0, scale_1.scaleTime)({
    domain: [
        Math.min(...cityTemperature_1.default.map(date)),
        Math.max(...cityTemperature_1.default.map(date)),
    ],
});
const temperatureScale = (0, scale_1.scaleLinear)({
    domain: [
        Math.min(...cityTemperature_1.default.map((d) => Math.min(ny(d), sf(d)))),
        Math.max(...cityTemperature_1.default.map((d) => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
});
const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };
function ThresholdChart({ width, height, margin = defaultMargin, }) {
    if (width < 10)
        return null;
    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    timeScale.range([0, xMax]);
    temperatureScale.range([yMax, 0]);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ width: width, height: height }, { children: [(0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: width, height: height, fill: exports.background, rx: 14 }), (0, jsx_runtime_1.jsxs)(group_1.Group, Object.assign({ left: margin.left, top: margin.top }, { children: [(0, jsx_runtime_1.jsx)(grid_1.GridRows, { scale: temperatureScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), (0, jsx_runtime_1.jsx)(grid_1.GridColumns, { scale: timeScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), (0, jsx_runtime_1.jsx)("line", { x1: xMax, x2: xMax, y1: 0, y2: yMax, stroke: "#e0e0e0" }), (0, jsx_runtime_1.jsx)(axis_1.AxisBottom, { top: yMax, scale: timeScale, numTicks: width > 520 ? 10 : 5 }), (0, jsx_runtime_1.jsx)(axis_1.AxisLeft, { scale: temperatureScale }), (0, jsx_runtime_1.jsx)("text", Object.assign({ x: "-70", y: "15", transform: "rotate(-90)", fontSize: 10 }, { children: "Temperature (\u00B0F)" })), (0, jsx_runtime_1.jsx)(threshold_1.Threshold, { id: `${Math.random()}`, data: cityTemperature_1.default, x: (d) => { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y0: (d) => { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }, y1: (d) => { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }, clipAboveTo: 0, clipBelowTo: yMax, curve: curve_1.curveBasis, belowAreaProps: {
                                    fill: 'violet',
                                    fillOpacity: 0.4,
                                }, aboveAreaProps: {
                                    fill: 'green',
                                    fillOpacity: 0.4,
                                } }), (0, jsx_runtime_1.jsx)(shape_1.LinePath, { data: cityTemperature_1.default, curve: curve_1.curveBasis, x: (d) => { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y: (d) => { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }, stroke: "#222", strokeWidth: 1.5, strokeOpacity: 0.8, strokeDasharray: "1,2" }), (0, jsx_runtime_1.jsx)(shape_1.LinePath, { data: cityTemperature_1.default, curve: curve_1.curveBasis, x: (d) => { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y: (d) => { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }, stroke: "#222", strokeWidth: 1.5 })] }))] })) }) }));
}
exports.ThresholdChart = ThresholdChart;
