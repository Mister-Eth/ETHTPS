"use strict";
exports.__esModule = true;
exports.useGetExperimentsFromAppStore = void 0;
var store_1 = require("../store");
var useGetExperimentsFromAppStore = function () {
    return (0, store_1.useAppSelector)(function (state) { return state.experiments; });
};
exports.useGetExperimentsFromAppStore = useGetExperimentsFromAppStore;
//# sourceMappingURL=ExperimentHooks.js.map