"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetNetworksFromAppStore = exports.useGetMaxGTPSDataFromAppStore = exports.useGetMaxGPSDataFromAppStore = exports.useGetMaxTPSDataFromAppStore = exports.useGetMaxDataForProviderFromAppStore = exports.useGetMaxDataFromAppStore = void 0;
const store_1 = require("../store");
function useGetMaxDataFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.maxData);
}
exports.useGetMaxDataFromAppStore = useGetMaxDataFromAppStore;
function useGetMaxDataForProviderFromAppStore(provider, type) {
    return (0, store_1.useAppSelector)((state) => state.maxData.getMaxDataFor(provider, type));
}
exports.useGetMaxDataForProviderFromAppStore = useGetMaxDataForProviderFromAppStore;
function useGetMaxTPSDataFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.maxData).maxTPSData;
}
exports.useGetMaxTPSDataFromAppStore = useGetMaxTPSDataFromAppStore;
function useGetMaxGPSDataFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.maxData).maxGPSData;
}
exports.useGetMaxGPSDataFromAppStore = useGetMaxGPSDataFromAppStore;
function useGetMaxGTPSDataFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.maxData).maxGTPSData;
}
exports.useGetMaxGTPSDataFromAppStore = useGetMaxGTPSDataFromAppStore;
function useGetNetworksFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.networks);
}
exports.useGetNetworksFromAppStore = useGetNetworksFromAppStore;
