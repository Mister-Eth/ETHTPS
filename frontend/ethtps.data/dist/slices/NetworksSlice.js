"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.networksReducer = exports.setNetworks = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = JSON.parse(
  (_a = localStorage.getItem("networks")) !== null && _a !== void 0 ? _a : "[]"
);
const networksSlice = (0, toolkit_1.createSlice)({
  name: "networks",
  initialState,
  reducers: {
    setNetworks(state, action) {
      if (action.payload !== undefined) {
        localStorage.setItem(action.payload, "networks");
        state.length = 0;
        state = [...action.payload];
      }
    },
  },
});
exports.setNetworks = networksSlice.actions.setNetworks;
exports.networksReducer = networksSlice.reducer;
