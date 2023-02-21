"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetExperimentsFromAppStore = void 0;
const store_1 = require("../store");
const useGetExperimentsFromAppStore = () => {
    return (0, store_1.useAppSelector)((state) => state.experiments);
};
exports.useGetExperimentsFromAppStore = useGetExperimentsFromAppStore;
