"use strict";
exports.__esModule = true;
exports.useGetProvidersFromAppStore = void 0;
var LiveDataHooks_1 = require("./LiveDataHooks");
var store_1 = require("../store");
function useGetProvidersFromAppStore() {
    var sidechainsIncluded = (0, LiveDataHooks_1.useGetSidechainsIncludedFromAppStore)();
    return (0, store_1.useAppSelector)(function (state) {
        return state.providers.filter(function (x) {
            return sidechainsIncluded ? x : x.type !== 'Sidechain';
        });
    });
}
exports.useGetProvidersFromAppStore = useGetProvidersFromAppStore;
//# sourceMappingURL=ProviderHooks.js.map