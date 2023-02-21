"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationStateReducer = exports.setStoreAPIKey = exports.setApplicationDataLoaded = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    applicationDataLoaded: false,
    completeApplicationDataAvailableInLocalStorage: false,
    apiKey: localStorage.getItem("XAPIKey"),
};
const applicationStateSlice = (0, toolkit_1.createSlice)({
    name: "applicationStates",
    initialState,
    reducers: {
        setApplicationDataLoaded(state, action) {
            if (action.payload === undefined)
                return state;
            state.applicationDataLoaded = action.payload;
            return state;
        },
        setStoreAPIKey(state, action) {
            localStorage.setItem("XAPIKey", action.payload);
            state.apiKey = action.payload;
            return state;
        },
    },
});
_a = applicationStateSlice.actions, exports.setApplicationDataLoaded = _a.setApplicationDataLoaded, exports.setStoreAPIKey = _a.setStoreAPIKey;
exports.applicationStateReducer = applicationStateSlice.reducer;
