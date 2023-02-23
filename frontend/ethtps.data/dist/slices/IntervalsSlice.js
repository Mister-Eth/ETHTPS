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
exports.__esModule = true;
exports.intervalsReducer = exports.setIntervals = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = JSON.parse((_a = localStorage.getItem('intervals')) !== null && _a !== void 0 ? _a : '[]');
var intervalsSlice = (0, toolkit_1.createSlice)({
    name: 'intervals',
    initialState: initialState,
    reducers: {
        setIntervals: function (state, action) {
            if (action.payload !== undefined) {
                localStorage.setItem('intervals', JSON.stringify(action.payload));
                state.length = 0;
                state = __spreadArray([], action.payload, true);
            }
        }
    }
});
exports.setIntervals = intervalsSlice.actions.setIntervals;
exports.intervalsReducer = intervalsSlice.reducer;
//# sourceMappingURL=IntervalsSlice.js.map