"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalsReducer = exports.setIntervals = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = JSON.parse((_a = localStorage.getItem('intervals')) !== null && _a !== void 0 ? _a : '[]');
const intervalsSlice = (0, toolkit_1.createSlice)({
    name: 'intervals',
    initialState,
    reducers: {
        setIntervals(state, action) {
            if (action.payload !== undefined) {
                localStorage.setItem('intervals', JSON.stringify(action.payload));
                state.length = 0;
                state = [...action.payload];
            }
        },
    },
});
exports.setIntervals = intervalsSlice.actions.setIntervals;
exports.intervalsReducer = intervalsSlice.reducer;
