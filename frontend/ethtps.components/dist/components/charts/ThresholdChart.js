import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
export const background = '#f3f3f3';
// accessors
const date = (d) => new Date(d.date).valueOf();
const ny = (d) => Number(d['New York']);
const sf = (d) => Number(d['San Francisco']);
// scales
const timeScale = scaleTime({
    domain: [
        Math.min(...cityTemperature.map(date)),
        Math.max(...cityTemperature.map(date)),
    ],
});
const temperatureScale = scaleLinear({
    domain: [
        Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
        Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
});
const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };
export function ThresholdChart({ width, height, margin = defaultMargin, }) {
    if (width < 10)
        return null;
    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    timeScale.range([0, xMax]);
    temperatureScale.range([yMax, 0]);
    return (_jsx(React.Fragment, { children: _jsx("div", { children: _jsxs("svg", { width: width, height: height, children: [_jsx("rect", { x: 0, y: 0, width: width, height: height, fill: background, rx: 14 }), _jsxs(Group, { left: margin.left, top: margin.top, children: [_jsx(GridRows, { scale: temperatureScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), _jsx(GridColumns, { scale: timeScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), _jsx("line", { x1: xMax, x2: xMax, y1: 0, y2: yMax, stroke: "#e0e0e0" }), _jsx(AxisBottom, { top: yMax, scale: timeScale, numTicks: width > 520 ? 10 : 5 }), _jsx(AxisLeft, { scale: temperatureScale }), _jsx("text", { x: "-70", y: "15", transform: "rotate(-90)", fontSize: 10, children: "Temperature (\u00B0F)" }), _jsx(Threshold, { id: `${Math.random()}`, data: cityTemperature, x: (d) => timeScale(date(d)) ?? 0, y0: (d) => temperatureScale(ny(d)) ?? 0, y1: (d) => temperatureScale(sf(d)) ?? 0, clipAboveTo: 0, clipBelowTo: yMax, curve: curveBasis, belowAreaProps: {
                                    fill: 'violet',
                                    fillOpacity: 0.4,
                                }, aboveAreaProps: {
                                    fill: 'green',
                                    fillOpacity: 0.4,
                                } }), _jsx(LinePath, { data: cityTemperature, curve: curveBasis, x: (d) => timeScale(date(d)) ?? 0, y: (d) => temperatureScale(sf(d)) ?? 0, stroke: "#222", strokeWidth: 1.5, strokeOpacity: 0.8, strokeDasharray: "1,2" }), _jsx(LinePath, { data: cityTemperature, curve: curveBasis, x: (d) => timeScale(date(d)) ?? 0, y: (d) => temperatureScale(ny(d)) ?? 0, stroke: "#222", strokeWidth: 1.5 })] })] }) }) }));
}
