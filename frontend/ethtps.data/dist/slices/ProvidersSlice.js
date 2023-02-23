"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
var _b;
exports.__esModule = true;
exports.providersReducer = exports.setProviders = exports.addProvider = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = JSON.parse((_b = localStorage.getItem('providers')) !== null && _b !== void 0 ? _b : '[]');
var providersSlice = (0, toolkit_1.createSlice)({
    name: 'providers',
    initialState: initialState,
    reducers: {
        addProvider: function (state, action) {
            state = __spreadArray(__spreadArray([], state, true), [action.payload], false);
            return __spreadArray([], state, true);
        },
        setProviders: function (state, action) {
            localStorage.setItem('providers', JSON.stringify(action.payload));
            return action.payload;
        }
    }
});
exports.addProvider = (_a = providersSlice.actions, _a.addProvider), exports.setProviders = _a.setProviders;
exports.providersReducer = providersSlice.reducer;
//# sourceMappingURL=ProvidersSlice.js.map