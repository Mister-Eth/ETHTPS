import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { Brush } from '@visx/brush';
import { PatternLines } from '@visx/pattern';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { max, extent } from 'd3-array';
import AreaChart from './AreaChart';
import React from 'react';
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
export const accentColor = '#f6acc8';
export const background = '#584153';
export const background2 = '#af8baf';
const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: 'white',
};
// accessors
const getDate = (d) => new Date(d?.date);
const getStockValue = (d) => d.close;
const toAppleStock = (d) => {
    return {
        date: d.x?.toTimeString(),
        close: d.y,
    };
};
export function BrushChart({ dataPoints, compact = false, width, height, margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
}, }) {
    const brushRef = useRef(null);
    const [filteredStock, setFilteredStock] = useState(dataPoints.map(toAppleStock));
    const stock = dataPoints.map(toAppleStock);
    const onBrushChange = (domain) => {
        if (!domain)
            return;
        const { x0, x1, y0, y1 } = domain;
        const stockCopy = dataPoints.filter((s) => {
            const x = (x) => x.x?.getTime() ?? new Date().getTime();
            const y = (x) => x.y ?? 0;
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
    const dateScale = useMemo(() => scaleTime({
        range: [0, xMax],
        domain: extent(filteredStock, getDate),
    }), [xMax, filteredStock]);
    const stockScale = useMemo(() => scaleLinear({
        range: [yMax, 0],
        domain: [0, max(filteredStock, getStockValue) || 0],
        nice: true,
    }), [yMax, filteredStock]);
    const brushDateScale = useMemo(() => scaleTime({
        range: [0, xBrushMax],
        domain: extent(stock, getDate),
    }), [xBrushMax]);
    const brushStockScale = useMemo(() => scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, max(stock, getStockValue) || 0],
        nice: true,
    }), [yBrushMax]);
    const initialBrushPosition = useMemo(() => ({
        start: { x: brushDateScale(getDate(stock[0])) },
        end: { x: brushDateScale(getDate(stock[stock.length - 1])) },
    }), [brushDateScale]);
    // event handlers
    const handleClearClick = () => {
        if (brushRef?.current) {
            setFilteredStock(stock);
            brushRef.current.reset();
        }
    };
    const handleResetClick = () => {
        if (brushRef?.current) {
            const updater = (prevBrush) => {
                const newExtent = brushRef.current.getExtent(initialBrushPosition.start, initialBrushPosition.end);
                const newState = {
                    ...prevBrush,
                    start: { y: newExtent.y0, x: newExtent.x0 },
                    end: { y: newExtent.y1, x: newExtent.x1 },
                    extent: newExtent,
                };
                return newState;
            };
            brushRef.current.updateBrush(updater);
        }
    };
    return (_jsxs("div", { children: [_jsxs("svg", { width: width, height: height, children: [_jsx(LinearGradient, { id: GRADIENT_ID, from: background, to: background2, rotate: 45 }), _jsx("rect", { x: 0, y: 0, width: width, height: height, fill: `url(#${GRADIENT_ID})`, rx: 14 }), _jsx(AreaChart, { hideBottomAxis: compact, data: [], width: width, margin: { ...margin, bottom: topChartBottomMargin }, yMax: yMax, xScale: dateScale, yScale: stockScale, gradientColor: background2 }), _jsxs(AreaChart, { hideBottomAxis: true, hideLeftAxis: true, data: [], width: width, yMax: yBrushMax, xScale: brushDateScale, yScale: brushStockScale, margin: brushMargin, top: topChartHeight + topChartBottomMargin + margin.top, gradientColor: background2, children: [_jsx(PatternLines, { id: PATTERN_ID, height: 8, width: 8, stroke: accentColor, strokeWidth: 1, orientation: ['diagonal'] }), _jsx(Brush, { xScale: brushDateScale, yScale: brushStockScale, width: xBrushMax, height: yBrushMax, margin: brushMargin, handleSize: 8, innerRef: brushRef, resizeTriggerAreas: ['left', 'right'], brushDirection: "horizontal", initialBrushPosition: initialBrushPosition, onChange: onBrushChange, onClick: () => setFilteredStock(stock), selectedBoxStyle: selectedBrushStyle, useWindowMoveEvents: true, renderBrushHandle: (props) => (_jsx(BrushHandle, { ...props })) })] })] }), _jsx("button", { onClick: handleClearClick, children: "Clear" }), "\u00A0", _jsx("button", { onClick: handleResetClick, children: "Reset" })] }));
}
// We need to manually offset the handles for them to be rendered at the right position
function BrushHandle({ x, height, isBrushActive }) {
    const pathWidth = 8;
    const pathHeight = 15;
    if (!isBrushActive) {
        return null;
    }
    return (_jsx(React.Fragment, { children: _jsx(Group, { left: x + pathWidth / 2, top: (height - pathHeight) / 2, children: _jsx("path", { fill: "#f2f2f2", d: "M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12", stroke: "#999999", strokeWidth: "1", style: { cursor: 'ew-resize' } }) }) }));
}
