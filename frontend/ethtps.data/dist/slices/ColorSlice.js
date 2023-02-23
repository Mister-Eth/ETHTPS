"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var _b;
exports.__esModule = true;
exports.colorReducer = exports.setProviderTypeColorDictionary = exports.setProviderColorDictionary = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = JSON.parse((_b = localStorage.getItem('IColorDictionaries')) !== null && _b !== void 0 ? _b : '{}');
var colorSlice = (0, toolkit_1.createSlice)({
    name: 'colors',
    initialState: initialState,
    reducers: {
        setProviderColorDictionary: function (state, action) {
            if (action.payload === undefined)
                return state;
            state.providerColorDictionary = __assign({}, action.payload);
            return state;
        },
        setProviderTypeColorDictionary: function (state, action) {
            if (action.payload === undefined)
                return state;
            action.payload['Others'] = 'yellow';
            localStorage.setItem('IColorDictionaries', JSON.stringify(action.payload));
            state.providerTypesColorDictionary = __assign({}, action.payload);
            return state;
        }
    }
});
exports.setProviderColorDictionary = (_a = colorSlice.actions, _a.setProviderColorDictionary), exports.setProviderTypeColorDictionary = _a.setProviderTypeColorDictionary;
exports.colorReducer = colorSlice.reducer;
//# sourceMappingURL=ColorSlice.js.map