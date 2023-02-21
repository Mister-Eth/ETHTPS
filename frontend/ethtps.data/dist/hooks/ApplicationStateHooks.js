"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetStoreAPIKey = exports.useMarkApplicationDataLoaded = exports.useGetApplicationDataLoadedFromAppStore = void 0;
const ApplicationStateSlice_1 = require("../slices/ApplicationStateSlice");
const store_1 = require("../store");
const WebsocketSubscriptionSlice_1 = require("../slices/WebsocketSubscriptionSlice");
const DependenciesIOC_1 = require("../models/services/DependenciesIOC");
const useGetApplicationDataLoadedFromAppStore = () => {
    return (0, store_1.useAppSelector)((state) => state.applicationState.applicationDataLoaded);
};
exports.useGetApplicationDataLoadedFromAppStore = useGetApplicationDataLoadedFromAppStore;
const useMarkApplicationDataLoaded = () => {
    store_1.store.dispatch((0, ApplicationStateSlice_1.setApplicationDataLoaded)(true));
};
exports.useMarkApplicationDataLoaded = useMarkApplicationDataLoaded;
const useSetStoreAPIKey = (apiKey) => {
    store_1.store.dispatch((0, ApplicationStateSlice_1.setStoreAPIKey)(apiKey));
    store_1.store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.setWSURL(DependenciesIOC_1.wsBaseURL + apiKey));
};
exports.useSetStoreAPIKey = useSetStoreAPIKey;
