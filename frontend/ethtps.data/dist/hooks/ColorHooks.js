"use strict";
exports.__esModule = true;
exports.useGetProviderTypeColorDictionaryFromAppStore = exports.useGetProviderColorDictionaryFromAppStore = void 0;
var store_1 = require("../store");
function useGetProviderColorDictionaryFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.colors.providerColorDictionary; });
}
exports.useGetProviderColorDictionaryFromAppStore = useGetProviderColorDictionaryFromAppStore;
function useGetProviderTypeColorDictionaryFromAppStore() {
    return (0, store_1.useAppSelector)(function (state) { return state.colors.providerTypesColorDictionary; });
}
exports.useGetProviderTypeColorDictionaryFromAppStore = useGetProviderTypeColorDictionaryFromAppStore;
//# sourceMappingURL=ColorHooks.js.map