import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Group } from '@visx/group';
import { AreaClosed } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
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
export default function AreaChart({ data, gradientColor, width, yMax, margin, xScale, yScale, hideBottomAxis = false, hideLeftAxis = false, top, left, children, }) {
    if (width < 10)
        return null;
    return (_jsx(React.Fragment, { children: _jsxs(Group, { left: left || margin.left, top: top || margin.top, children: [_jsx(LinearGradient, { id: "gradient", from: gradientColor, fromOpacity: 1, to: gradientColor, toOpacity: 0.2 }), _jsx(AreaClosed, { data: data, x: (d) => xScale(d.x) || new Date().getTime(), y: (d) => yScale(d.y) || 0, yScale: yScale, strokeWidth: 1, stroke: "url(#gradient)", fill: "url(#gradient)", curve: curveMonotoneX }), !hideBottomAxis && (_jsx(AxisBottom, { top: yMax, scale: xScale, numTicks: width > 520 ? 10 : 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: () => axisBottomTickLabelProps })), !hideLeftAxis && (_jsx(AxisLeft, { scale: yScale, numTicks: 5, stroke: axisColor, tickStroke: axisColor, tickLabelProps: () => axisLeftTickLabelProps })), children] }) }));
}
