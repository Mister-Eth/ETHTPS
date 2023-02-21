"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetProviderTypeColorDictionaryFromAppStore = exports.useGetProviderColorDictionaryFromAppStore = void 0;
const store_1 = require("../store");
function useGetProviderColorDictionaryFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.colors.providerColorDictionary);
}
exports.useGetProviderColorDictionaryFromAppStore = useGetProviderColorDictionaryFromAppStore;
function useGetProviderTypeColorDictionaryFromAppStore() {
    return (0, store_1.useAppSelector)((state) => state.colors.providerTypesColorDictionary);
}
exports.useGetProviderTypeColorDictionaryFromAppStore = useGetProviderTypeColorDictionaryFromAppStore;
