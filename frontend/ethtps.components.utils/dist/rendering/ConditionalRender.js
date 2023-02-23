"use strict";
exports.__esModule = true;
exports.BinaryConditionalRender = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function BinaryConditionalRender(props) {
    return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: props.condition ? props.childrenGenerator() : null }));
}
exports.BinaryConditionalRender = BinaryConditionalRender;
//# sourceMappingURL=ConditionalRender.js.map