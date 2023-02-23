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
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
// Initialize some variables
var axisColor = '#fff';
var axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: axisColor,
};
var axisLeftTickLabelProps = {
    dx: '-0.25em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
    fill: axisColor,
};
export default function AreaChart(_a) {
    var data = _a.data, gradientColor = _a.gradientColor, width = _a.width, yMax = _a.yMax, margin = _a.margin, xScale = _a.xScale, yScale = _a.yScale, _b = _a.hideBottomAxis, hideBottomAxis = _b === void 0 ? false : _b, _c = _a.hideLeftAxis, hideLeftAxis = _c === void 0 ? false : _c, top = _a.top, left = _a.left, children = _a.children;
    if (width < 10)
        return null;
    return (_jsx(React.Fragment, { children: _jsxs(Group, __assign({ left: left || margin.left, top: top || margin.top }, { children: [_jsx(LinearGradient, { id: "gradient", from: gradientColor, fromOpacity: 1, to: gradientColor, toOpacity: 0.2 }), _jsx(AreaClosed, { data: data, x: function (d) { return xScale(d.x) || new Date().getTime(); }, y: function (d) { return yScale(d.y) || 0; }, yScale: yScale, strokeWidth: 1, stroke: "url(#gradient)", fill: "url(#gradient)", curve: curveMonotoneX }), !hideBottomAxis && (_jsx(AxisBottom, { top: yMax, scale: xScale, numTicks: width > 520 ? 10 : 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: function () { return axisBottomTickLabelProps; } })), !hideLeftAxis && (_jsx(AxisLeft, { scale: yScale, numTicks: 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: function () { return axisLeftTickLabelProps; } })), children] })) }));
}
//# sourceMappingURL=AreaChart.js.map