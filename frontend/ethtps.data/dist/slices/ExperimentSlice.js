"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.experimentReducer = exports.setExperiments = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = JSON.parse((_a = localStorage.getItem('experiments')) !== null && _a !== void 0 ? _a : '[]');
const experimentSlice = (0, toolkit_1.createSlice)({
    name: 'experiments',
    initialState,
    reducers: {
        setExperiments(state, action) {
            localStorage.setItem('experiments', JSON.stringify(action.payload));
            return action.payload;
        },
    },
});
exports.setExperiments = experimentSlice.actions.setExperiments;
exports.experimentReducer = experimentSlice.reducer;
