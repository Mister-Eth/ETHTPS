"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainPageReducer = exports.setHighlightedProvider = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {};
const mainPage = (0, toolkit_1.createSlice)({
    name: 'mainPage',
    initialState,
    reducers: {
        setHighlightedProvider(state, action) {
            state.highlighedProvider = action.payload;
        },
    },
});
exports.setHighlightedProvider = mainPage.actions.setHighlightedProvider;
exports.mainPageReducer = mainPage.reducer;
