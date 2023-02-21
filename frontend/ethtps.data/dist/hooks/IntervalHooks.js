"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetIntervalsFromAppStore = void 0;
const store_1 = require("../store");
function useGetIntervalsFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.intervals);
}
exports.useGetIntervalsFromAppStore = useGetIntervalsFromAppStore;
