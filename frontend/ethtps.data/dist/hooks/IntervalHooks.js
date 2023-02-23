"use strict";
exports.__esModule = true;
exports.useGetIntervalsFromAppStore = void 0;
var store_1 = require("../store");
function useGetIntervalsFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.intervals; });
}
exports.useGetIntervalsFromAppStore = useGetIntervalsFromAppStore;
//# sourceMappingURL=IntervalHooks.js.map