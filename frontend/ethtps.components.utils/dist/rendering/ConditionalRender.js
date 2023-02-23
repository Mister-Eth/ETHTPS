"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryConditionalRender = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function BinaryConditionalRender(props) {
    return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: props.condition ? props.childrenGenerator() : null }));
}
exports.BinaryConditionalRender = BinaryConditionalRender;
