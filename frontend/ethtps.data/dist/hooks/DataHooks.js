"use strict";
exports.__esModule = true;
exports.useGetNetworksFromAppStore = exports.useGetMaxGTPSDataFromAppStore = exports.useGetMaxGPSDataFromAppStore = exports.useGetMaxTPSDataFromAppStore = exports.useGetMaxDataForProviderFromAppStore = exports.useGetMaxDataFromAppStore = void 0;
var store_1 = require("../store");
function useGetMaxDataFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.maxData; });
}
exports.useGetMaxDataFromAppStore = useGetMaxDataFromAppStore;
function useGetMaxDataForProviderFromAppStore(provider, type) {
    return (0, store_1.useAppSelector)(function (state) {
        return state.maxData.getMaxDataFor(provider, type);
    });
}
exports.useGetMaxDataForProviderFromAppStore = useGetMaxDataForProviderFromAppStore;
function useGetMaxTPSDataFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.maxData; }).maxTPSData;
}
exports.useGetMaxTPSDataFromAppStore = useGetMaxTPSDataFromAppStore;
function useGetMaxGPSDataFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.maxData; }).maxGPSData;
}
exports.useGetMaxGPSDataFromAppStore = useGetMaxGPSDataFromAppStore;
function useGetMaxGTPSDataFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.maxData; }).maxGTPSData;
}
exports.useGetMaxGTPSDataFromAppStore = useGetMaxGTPSDataFromAppStore;
function useGetNetworksFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.networks; });
}
exports.useGetNetworksFromAppStore = useGetNetworksFromAppStore;
//# sourceMappingURL=DataHooks.js.map