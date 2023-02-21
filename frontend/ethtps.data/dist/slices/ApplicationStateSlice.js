"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationStateReducer = exports.setApplicationDataLoaded = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    applicationDataLoaded: false,
    completeApplicationDataAvailableInLocalStorage: false,
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
    },
});
exports.setApplicationDataLoaded = applicationStateSlice.actions.setApplicationDataLoaded;
exports.applicationStateReducer = applicationStateSlice.reducer;
