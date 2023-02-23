"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrushChart = exports.background2 = exports.background = exports.accentColor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/no-use-before-define */
const react_1 = require("react");
const scale_1 = require("@visx/scale");
const brush_1 = require("@visx/brush");
const pattern_1 = require("@visx/pattern");
const group_1 = require("@visx/group");
const gradient_1 = require("@visx/gradient");
const d3_array_1 = require("d3-array");
const AreaChart_1 = __importDefault(require("./AreaChart"));
const react_2 = __importDefault(require("react"));
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
exports.accentColor = '#f6acc8';
exports.background = '#584153';
exports.background2 = '#af8baf';
const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: 'white',
};
// accessors
const getDate = (d) => new Date(d === null || d === void 0 ? void 0 : d.date);
const getStockValue = (d) => d.close;
const toAppleStock = (d) => {
    var _a;
    return {
        date: (_a = d.x) === null || _a === void 0 ? void 0 : _a.toTimeString(),
        close: d.y,
    };
};
function BrushChart({ dataPoints, compact = false, width, height, margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
}, }) {
    const brushRef = (0, react_1.useRef)(null);
    const [filteredStock, setFilteredStock] = (0, react_1.useState)(dataPoints.map(toAppleStock));
    const stock = dataPoints.map(toAppleStock);
    const onBrushChange = (domain) => {
        if (!domain)
            return;
        const { x0, x1, y0, y1 } = domain;
        const stockCopy = dataPoints.filter((s) => {
            const x = (x) => { var _a, _b; return (_b = (_a = x.x) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : new Date().getTime(); };
            const y = (x) => { var _a; return (_a = x.y) !== null && _a !== void 0 ? _a : 0; };
            return x(s) > x0 && x(s) < x1 && y(s) > y0 && y(s) < y1;
        });
        setFilteredStock(stockCopy.map(toAppleStock));
    };
    const innerHeight = height - margin.top - margin.bottom;
    const topChartBottomMargin = compact
        ? chartSeparation / 2
        : chartSeparation + 10;
    const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
    const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;
    // bounds
    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = Math.max(topChartHeight, 0);
    const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
    const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);
    // scales
    const dateScale = (0, react_1.useMemo)(() => (0, scale_1.scaleTime)({
        range: [0, xMax],
        domain: (0, d3_array_1.extent)(filteredStock, getDate),
    }), [xMax, filteredStock]);
    const stockScale = (0, react_1.useMemo)(() => (0, scale_1.scaleLinear)({
        range: [yMax, 0],
        domain: [0, (0, d3_array_1.max)(filteredStock, getStockValue) || 0],
        nice: true,
    }), [yMax, filteredStock]);
    const brushDateScale = (0, react_1.useMemo)(() => (0, scale_1.scaleTime)({
        range: [0, xBrushMax],
        domain: (0, d3_array_1.extent)(stock, getDate),
    }), [xBrushMax]);
    const brushStockScale = (0, react_1.useMemo)(() => (0, scale_1.scaleLinear)({
        range: [yBrushMax, 0],
        domain: [0, (0, d3_array_1.max)(stock, getStockValue) || 0],
        nice: true,
    }), [yBrushMax]);
    const initialBrushPosition = (0, react_1.useMemo)(() => ({
        start: { x: brushDateScale(getDate(stock[0])) },
        end: { x: brushDateScale(getDate(stock[stock.length - 1])) },
    }), [brushDateScale]);
    // event handlers
    const handleClearClick = () => {
        if (brushRef === null || brushRef === void 0 ? void 0 : brushRef.current) {
            setFilteredStock(stock);
            brushRef.current.reset();
        }
    };
    const handleResetClick = () => {
        if (brushRef === null || brushRef === void 0 ? void 0 : brushRef.current) {
            const updater = (prevBrush) => {
                const newExtent = brushRef.current.getExtent(initialBrushPosition.start, initialBrushPosition.end);
                const newState = Object.assign(Object.assign({}, prevBrush), { start: { y: newExtent.y0, x: newExtent.x0 }, end: { y: newExtent.y1, x: newExtent.x1 }, extent: newExtent });
                return newState;
            };
            brushRef.current.updateBrush(updater);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("svg", Object.assign({ width: width, height: height }, { children: [(0, jsx_runtime_1.jsx)(gradient_1.LinearGradient, { id: GRADIENT_ID, from: exports.background, to: exports.background2, rotate: 45 }), (0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: width, height: height, fill: `url(#${GRADIENT_ID})`, rx: 14 }), (0, jsx_runtime_1.jsx)(AreaChart_1.default, { hideBottomAxis: compact, data: [], width: width, margin: Object.assign(Object.assign({}, margin), { bottom: topChartBottomMargin }), yMax: yMax, xScale: dateScale, yScale: stockScale, gradientColor: exports.background2 }), (0, jsx_runtime_1.jsxs)(AreaChart_1.default, Object.assign({ hideBottomAxis: true, hideLeftAxis: true, data: [], width: width, yMax: yBrushMax, xScale: brushDateScale, yScale: brushStockScale, margin: brushMargin, top: topChartHeight + topChartBottomMargin + margin.top, gradientColor: exports.background2 }, { children: [(0, jsx_runtime_1.jsx)(pattern_1.PatternLines, { id: PATTERN_ID, height: 8, width: 8, stroke: exports.accentColor, strokeWidth: 1, orientation: ['diagonal'] }), (0, jsx_runtime_1.jsx)(brush_1.Brush, { xScale: brushDateScale, yScale: brushStockScale, width: xBrushMax, height: yBrushMax, margin: brushMargin, handleSize: 8, innerRef: brushRef, resizeTriggerAreas: ['left', 'right'], brushDirection: "horizontal", initialBrushPosition: initialBrushPosition, onChange: onBrushChange, onClick: () => setFilteredStock(stock), selectedBoxStyle: selectedBrushStyle, useWindowMoveEvents: true, renderBrushHandle: (props) => ((0, jsx_runtime_1.jsx)(BrushHandle, Object.assign({}, props))) })] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleClearClick }, { children: "Clear" })), "\u00A0", (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleResetClick }, { children: "Reset" }))] }));
}
exports.BrushChart = BrushChart;
// We need to manually offset the handles for them to be rendered at the right position
function BrushHandle({ x, height, isBrushActive }) {
    const pathWidth = 8;
    const pathHeight = 15;
    if (!isBrushActive) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsx)(group_1.Group, Object.assign({ left: x + pathWidth / 2, top: (height - pathHeight) / 2 }, { children: (0, jsx_runtime_1.jsx)("path", { fill: "#f2f2f2", d: "M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12", stroke: "#999999", strokeWidth: "1", style: { cursor: 'ew-resize' } }) })) }));
}
