"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISXLegend = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const scale_1 = require("@visx/scale");
//import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph'
const legend_1 = require("@visx/legend");
const react_1 = __importDefault(require("react"));
const legendGlyphSize = 20;
function VISXLegend({ keys, colors }) {
    if (keys && colors) {
        const scale = (0, scale_1.scaleOrdinal)({
            domain: keys,
            range: colors,
        });
        return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                    position: 'relative',
                    float: 'right',
                    transform: 'translateY(-110%)',
                    marginRight: '10px',
                } }, { children: (0, jsx_runtime_1.jsx)(legend_1.Legend, Object.assign({ scale: scale }, { children: (labels) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: {
                            display: 'flex',
                            flexDirection: 'column',
                        } }, { children: labels.map((label, i) => {
                            //const color = scale(label.datum)
                            //const shape = shapeScale(label.datum)
                            //const isValidElement = React.isValidElement(shape)
                            return ((0, jsx_runtime_1.jsxs)(legend_1.LegendItem, Object.assign({ margin: "0 4px 0 0", flexDirection: "row", onClick: () => {
                                    //const { datum, index } = label
                                } }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ width: legendGlyphSize, height: legendGlyphSize }, { children: (0, jsx_runtime_1.jsx)("rect", { fill: label.value, width: legendGlyphSize, height: legendGlyphSize }) })), (0, jsx_runtime_1.jsx)(legend_1.LegendLabel, Object.assign({ align: "left", margin: 0 }, { children: label.text }))] }), `legend-quantile-${i}`));
                        }) }))) })) })) }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
}
exports.VISXLegend = VISXLegend;
