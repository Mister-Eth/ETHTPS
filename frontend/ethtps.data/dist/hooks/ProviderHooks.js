"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetProvidersFromAppStore = void 0;
const LiveDataHooks_1 = require("./LiveDataHooks");
const store_1 = require("../store");
function useGetProvidersFromAppStore() {
    const sidechainsIncluded = (0, LiveDataHooks_1.useGetSidechainsIncludedFromAppStore)();
    return (0, store_1.useAppSelector)((state) => state.providers.filter((x) => sidechainsIncluded ? x : x.type !== 'Sidechain'));
}
exports.useGetProvidersFromAppStore = useGetProvidersFromAppStore;
