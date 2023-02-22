import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { scaleOrdinal } from '@visx/scale';
import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph';
import { Legend, LegendItem, LegendLabel } from '@visx/legend';
import React from 'react';
const shapeScale = scaleOrdinal({
    domain: ['a', 'b', 'c', 'd', 'e'],
    range: [
        _jsx(GlyphStar, { size: 50, top: 50 / 6, left: 50 / 6, fill: "#dd59b8" }, "a"),
        _jsx(GlyphWye, { size: 50, top: 50 / 6, left: 50 / 6, fill: "#de6a9a" }, "b"),
        _jsx(GlyphTriangle, { size: 50, top: 50 / 6, left: 50 / 6, fill: "#de7d7b" }, "c"),
        _jsx(GlyphDiamond, { size: 50, top: 50 / 6, left: 50 / 6, fill: "#df905f" }, "d"),
        () => (_jsx("text", { fontSize: "12", dy: "1em", dx: ".33em", fill: "#e0a346", children: "$" }, "e")),
    ],
});
const legendGlyphSize = 20;
export function VISXLegend({ keys, colors }) {
    if (keys && colors) {
        const scale = scaleOrdinal({
            domain: keys,
            range: colors,
        });
        return (_jsx(React.Fragment, { children: _jsx("div", { style: {
                    position: 'relative',
                    float: 'right',
                    transform: 'translateY(-110%)',
                    marginRight: '10px',
                }, children: _jsx(Legend, { scale: scale, children: (labels) => (_jsx("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                        }, children: labels.map((label, i) => {
                            const color = scale(label.datum);
                            const shape = shapeScale(label.datum);
                            const isValidElement = React.isValidElement(shape);
                            return (_jsxs(LegendItem, { margin: "0 4px 0 0", flexDirection: "row", onClick: () => {
                                    const { datum, index } = label;
                                }, children: [_jsx("svg", { width: legendGlyphSize, height: legendGlyphSize, children: _jsx("rect", { fill: label.value, width: legendGlyphSize, height: legendGlyphSize }) }), _jsx(LegendLabel, { align: "left", margin: 0, children: label.text })] }, `legend-quantile-${i}`));
                        }) })) }) }) }));
    }
    return _jsx(_Fragment, {});
}
