"use strict";
var _a;
exports.__esModule = true;
exports.applicationStateReducer = exports.setStoreAPIKey = exports.setApplicationDataLoaded = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    applicationDataLoaded: false,
    completeApplicationDataAvailableInLocalStorage: false,
    apiKey: localStorage.getItem('XAPIKey')
};
var applicationStateSlice = (0, toolkit_1.createSlice)({
    name: 'applicationStates',
    initialState: initialState,
    reducers: {
        setApplicationDataLoaded: function (state, action) {
            if (action.payload === undefined)
                return state;
            state.applicationDataLoaded = action.payload;
            return state;
        },
        setStoreAPIKey: function (state, action) {
            localStorage.setItem('XAPIKey', action.payload);
            state.apiKey = action.payload;
            return state;
        }
    }
});
exports.setApplicationDataLoaded = (_a = applicationStateSlice.actions, _a.setApplicationDataLoaded), exports.setStoreAPIKey = _a.setStoreAPIKey;
exports.applicationStateReducer = applicationStateSlice.reducer;
//# sourceMappingURL=ApplicationStateSlice.js.map