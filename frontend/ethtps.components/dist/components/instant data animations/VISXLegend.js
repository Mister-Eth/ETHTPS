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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { scaleOrdinal } from '@visx/scale';
//import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph'
import { Legend, LegendItem, LegendLabel } from '@visx/legend';
import React from 'react';
var legendGlyphSize = 20;
export function VISXLegend(_a) {
    var keys = _a.keys, colors = _a.colors;
    if (keys && colors) {
        var scale = scaleOrdinal({
            domain: keys,
            range: colors,
        });
        return (_jsx(React.Fragment, { children: _jsx("div", __assign({ style: {
                    position: 'relative',
                    float: 'right',
                    transform: 'translateY(-110%)',
                    marginRight: '10px',
                } }, { children: _jsx(Legend, __assign({ scale: scale }, { children: function (labels) { return (_jsx("div", __assign({ style: {
                            display: 'flex',
                            flexDirection: 'column',
                        } }, { children: labels.map(function (label, i) {
                            //const color = scale(label.datum)
                            //const shape = shapeScale(label.datum)
                            //const isValidElement = React.isValidElement(shape)
                            return (_jsxs(LegendItem, __assign({ margin: "0 4px 0 0", flexDirection: "row", onClick: function () {
                                    //const { datum, index } = label
                                } }, { children: [_jsx("svg", __assign({ width: legendGlyphSize, height: legendGlyphSize }, { children: _jsx("rect", { fill: label.value, width: legendGlyphSize, height: legendGlyphSize }) })), _jsx(LegendLabel, __assign({ align: "left", margin: 0 }, { children: label.text }))] }), "legend-quantile-".concat(i)));
                        }) }))); } })) })) }));
    }
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=VISXLegend.js.map