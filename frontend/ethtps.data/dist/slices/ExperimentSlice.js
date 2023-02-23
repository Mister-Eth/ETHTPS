"use strict";
var _a;
exports.__esModule = true;
exports.experimentReducer = exports.setExperiments = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = JSON.parse((_a = localStorage.getItem('experiments')) !== null && _a !== void 0 ? _a : '[]');
var experimentSlice = (0, toolkit_1.createSlice)({
    name: 'experiments',
    initialState: initialState,
    reducers: {
        setExperiments: function (state, action) {
            localStorage.setItem('experiments', JSON.stringify(action.payload));
            return action.payload;
        }
    }
});
exports.setExperiments = experimentSlice.actions.setExperiments;
exports.experimentReducer = experimentSlice.reducer;
//# sourceMappingURL=ExperimentSlice.js.map