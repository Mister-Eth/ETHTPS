"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorReducer = exports.setProviderTypeColorDictionary = exports.setProviderColorDictionary = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = JSON.parse((_b = localStorage.getItem('IColorDictionaries')) !== null && _b !== void 0 ? _b : '{}');
const colorSlice = (0, toolkit_1.createSlice)({
    name: 'colors',
    initialState,
    reducers: {
        setProviderColorDictionary(state, action) {
            if (action.payload === undefined)
                return state;
            state.providerColorDictionary = Object.assign({}, action.payload);
            return state;
        },
        setProviderTypeColorDictionary(state, action) {
            if (action.payload === undefined)
                return state;
            action.payload['Others'] = 'yellow';
            localStorage.setItem('IColorDictionaries', JSON.stringify(action.payload));
            state.providerTypesColorDictionary = Object.assign({}, action.payload);
            return state;
        },
    },
});
_a = colorSlice.actions, exports.setProviderColorDictionary = _a.setProviderColorDictionary, exports.setProviderTypeColorDictionary = _a.setProviderTypeColorDictionary;
exports.colorReducer = colorSlice.reducer;
