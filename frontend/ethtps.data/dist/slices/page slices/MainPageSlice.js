"use strict";
exports.__esModule = true;
exports.mainPageReducer = exports.setHighlightedProvider = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {};
var mainPage = (0, toolkit_1.createSlice)({
    name: 'mainPage',
    initialState: initialState,
    reducers: {
        setHighlightedProvider: function (state, action) {
            state.highlighedProvider = action.payload;
        }
    }
});
exports.setHighlightedProvider = mainPage.actions.setHighlightedProvider;
exports.mainPageReducer = mainPage.reducer;
//# sourceMappingURL=MainPageSlice.js.map