var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
export var background = '#f3f3f3';
// accessors
var date = function (d) { return new Date(d.date).valueOf(); };
var ny = function (d) { return Number(d['New York']); };
var sf = function (d) { return Number(d['San Francisco']); };
// scales
var timeScale = scaleTime({
    domain: [
        Math.min.apply(Math, cityTemperature.map(date)),
        Math.max.apply(Math, cityTemperature.map(date)),
    ],
});
var temperatureScale = scaleLinear({
    domain: [
        Math.min.apply(Math, cityTemperature.map(function (d) { return Math.min(ny(d), sf(d)); })),
        Math.max.apply(Math, cityTemperature.map(function (d) { return Math.max(ny(d), sf(d)); })),
    ],
    nice: true,
});
var defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };
export function ThresholdChart(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    if (width < 10)
        return null;
    // bounds
    var xMax = width - margin.left - margin.right;
    var yMax = height - margin.top - margin.bottom;
    timeScale.range([0, xMax]);
    temperatureScale.range([yMax, 0]);
    return (_jsx(React.Fragment, { children: _jsx("div", { children: _jsxs("svg", __assign({ width: width, height: height }, { children: [_jsx("rect", { x: 0, y: 0, width: width, height: height, fill: background, rx: 14 }), _jsxs(Group, __assign({ left: margin.left, top: margin.top }, { children: [_jsx(GridRows, { scale: temperatureScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), _jsx(GridColumns, { scale: timeScale, width: xMax, height: yMax, stroke: "#e0e0e0" }), _jsx("line", { x1: xMax, x2: xMax, y1: 0, y2: yMax, stroke: "#e0e0e0" }), _jsx(AxisBottom, { top: yMax, scale: timeScale, numTicks: width > 520 ? 10 : 5 }), _jsx(AxisLeft, { scale: temperatureScale }), _jsx("text", __assign({ x: "-70", y: "15", transform: "rotate(-90)", fontSize: 10 }, { children: "Temperature (\u00B0F)" })), _jsx(Threshold, { id: "".concat(Math.random()), data: cityTemperature, x: function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y0: function (d) { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }, y1: function (d) { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }, clipAboveTo: 0, clipBelowTo: yMax, curve: curveBasis, belowAreaProps: {
                                    fill: 'violet',
                                    fillOpacity: 0.4,
                                }, aboveAreaProps: {
                                    fill: 'green',
                                    fillOpacity: 0.4,
                                } }), _jsx(LinePath, { data: cityTemperature, curve: curveBasis, x: function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y: function (d) { var _a; return (_a = temperatureScale(sf(d))) !== null && _a !== void 0 ? _a : 0; }, stroke: "#222", strokeWidth: 1.5, strokeOpacity: 0.8, strokeDasharray: "1,2" }), _jsx(LinePath, { data: cityTemperature, curve: curveBasis, x: function (d) { var _a; return (_a = timeScale(date(d))) !== null && _a !== void 0 ? _a : 0; }, y: function (d) { var _a; return (_a = temperatureScale(ny(d))) !== null && _a !== void 0 ? _a : 0; }, stroke: "#222", strokeWidth: 1.5 })] }))] })) }) }));
}
//# sourceMappingURL=ThresholdChart.js.map