"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.providersReducer = exports.setProviders = exports.addProvider = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = JSON.parse((_b = localStorage.getItem("providers")) !== null && _b !== void 0 ? _b : "[]");
const providersSlice = (0, toolkit_1.createSlice)({
    name: "providers",
    initialState,
    reducers: {
        addProvider: (state, action) => {
            state = [...state, action.payload];
            return [...state];
        },
        setProviders(state, action) {
            localStorage.setItem("providers", JSON.stringify(action.payload));
            return action.payload;
        },
    },
});
_a = providersSlice.actions, exports.addProvider = _a.addProvider, exports.setProviders = _a.setProviders;
exports.providersReducer = providersSlice.reducer;
