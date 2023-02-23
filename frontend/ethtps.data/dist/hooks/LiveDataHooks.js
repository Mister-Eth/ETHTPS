"use strict";
exports.__esModule = true;
exports.useSetSidechainsIncluded = exports.useGetSidechainsIncludedFromAppStore = exports.useUpdateLiveData = exports.useSetDataModeMutation = exports.useGetLiveDataFromAppStore = exports.useGetLiveDataSmoothingFromAppStore = exports.useGetLiveDataModeFromAppStore = void 0;
var LiveDataSlice_1 = require("../slices/LiveDataSlice");
var WebsocketSubscriptionSlice_1 = require("../slices/WebsocketSubscriptionSlice");
var store_1 = require("../store");
function useGetLiveDataModeFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.liveData.liveDataType; });
}
exports.useGetLiveDataModeFromAppStore = useGetLiveDataModeFromAppStore;
function useGetLiveDataSmoothingFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.liveData.liveDataSmoothing; });
}
exports.useGetLiveDataSmoothingFromAppStore = useGetLiveDataSmoothingFromAppStore;
function useGetLiveDataFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.liveData.data; });
}
exports.useGetLiveDataFromAppStore = useGetLiveDataFromAppStore;
function useSetDataModeMutation(mode) {
    store_1.store.dispatch((0, LiveDataSlice_1.setLiveDataType)(mode));
}
exports.useSetDataModeMutation = useSetDataModeMutation;
function useUpdateLiveData(updateRateMs) {
    store_1.store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.connecting());
}
exports.useUpdateLiveData = useUpdateLiveData;
function useGetSidechainsIncludedFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.liveData.includeSidechains; });
}
exports.useGetSidechainsIncludedFromAppStore = useGetSidechainsIncludedFromAppStore;
function useSetSidechainsIncluded(value) {
    store_1.store.dispatch((0, LiveDataSlice_1.setIncludeSidechains)(value));
}
exports.useSetSidechainsIncluded = useSetSidechainsIncluded;
//# sourceMappingURL=LiveDataHooks.js.map