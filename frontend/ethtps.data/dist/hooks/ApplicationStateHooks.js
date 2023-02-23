"use strict";
exports.__esModule = true;
exports.useSetStoreAPIKey = exports.useMarkApplicationDataLoaded = exports.useGetApplicationDataLoadedFromAppStore = void 0;
var ApplicationStateSlice_1 = require("../slices/ApplicationStateSlice");
var store_1 = require("../store");
var WebsocketSubscriptionSlice_1 = require("../slices/WebsocketSubscriptionSlice");
var DependenciesIOC_1 = require("../models/services/DependenciesIOC");
var useGetApplicationDataLoadedFromAppStore = function () {
    return (0, store_1.useAppSelector)(function (state) { return state.applicationState.applicationDataLoaded; });
};
exports.useGetApplicationDataLoadedFromAppStore = useGetApplicationDataLoadedFromAppStore;
var useMarkApplicationDataLoaded = function () {
    store_1.store.dispatch((0, ApplicationStateSlice_1.setApplicationDataLoaded)(true));
};
exports.useMarkApplicationDataLoaded = useMarkApplicationDataLoaded;
var useSetStoreAPIKey = function (apiKey) {
    store_1.store.dispatch((0, ApplicationStateSlice_1.setStoreAPIKey)(apiKey));
    store_1.store.dispatch(WebsocketSubscriptionSlice_1.websocketActions.setWSURL(DependenciesIOC_1.wsBaseURL + apiKey));
};
exports.useSetStoreAPIKey = useSetStoreAPIKey;
//# sourceMappingURL=ApplicationStateHooks.js.map