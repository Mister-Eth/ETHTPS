"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useForceUpdate() {
    const [, setValue] = (0, react_1.useState)(0);
    return () => setValue((value) => value + 1); // update state to force render
}
exports.default = useForceUpdate;
