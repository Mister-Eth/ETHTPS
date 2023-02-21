"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMarkApplicationDataLoaded = exports.useGetApplicationDataLoadedFromAppStore = void 0;
const ApplicationStateSlice_1 = require("../slices/ApplicationStateSlice");
const store_1 = require("../store");
const useGetApplicationDataLoadedFromAppStore = () => {
    return (0, store_1.useAppSelector)((state) => state.applicationState.applicationDataLoaded);
};
exports.useGetApplicationDataLoadedFromAppStore = useGetApplicationDataLoadedFromAppStore;
const useMarkApplicationDataLoaded = () => {
    store_1.store.dispatch((0, ApplicationStateSlice_1.setApplicationDataLoaded)(true));
};
exports.useMarkApplicationDataLoaded = useMarkApplicationDataLoaded;
