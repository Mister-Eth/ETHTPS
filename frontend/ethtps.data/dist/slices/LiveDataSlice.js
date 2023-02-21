"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveDataReducer = exports.setLastMinuteData = exports.setIncludeSidechains = exports.setLiveData = exports.setLiveDataType = exports.setLiveDataSmoothing = exports.setCurrentVisitors = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const TimeIntervals_1 = require("../models/TimeIntervals");
const ethtps_api_client_1 = require("ethtps.api.client");
const initialState = {
    liveDataSmoothing: TimeIntervals_1.TimeInterval.Instant,
    liveDataType: ethtps_api_client_1.DataType.Tps,
    includeSidechains: (_b = JSON.parse(localStorage.getItem("includeSidechains"))) !== null && _b !== void 0 ? _b : false,
    oneMinuteTPSData: JSON.parse(localStorage.getItem("oneMinuteTPSData")),
    oneMinuteGPSData: JSON.parse(localStorage.getItem("oneMinuteGPSData")),
    oneMinuteGTPSData: JSON.parse(localStorage.getItem("oneMinuteGTPSData")),
    currentVisitors: 0,
};
const liveDataSlice = (0, toolkit_1.createSlice)({
    name: "live data",
    initialState,
    reducers: {
        setCurrentVisitors(state, action) {
            var _a;
            state.currentVisitors = (_a = action.payload) !== null && _a !== void 0 ? _a : 1;
        },
        setLiveDataSmoothing(state, action) {
            if (action.payload === undefined)
                return state;
            state.liveDataSmoothing = action.payload;
        },
        setLiveDataType(state, action) {
            if (action.payload === undefined)
                return state;
            state.liveDataType = action.payload;
        },
        setLiveData(state, action) {
            if (!action.payload)
                return state;
            state.data = action.payload;
        },
        setIncludeSidechains(state, action) {
            var _a;
            localStorage.setItem("includeSidechains", JSON.stringify(action.payload));
            state.includeSidechains = (_a = action.payload) !== null && _a !== void 0 ? _a : false;
        },
        setLastMinuteData(state, action) {
            switch (state.liveDataType) {
                case ethtps_api_client_1.DataType.Tps:
                    localStorage.setItem("oneMinuteTPSData", JSON.stringify(action.payload));
                    state.oneMinuteTPSData = action.payload;
                    break;
                case ethtps_api_client_1.DataType.Gps:
                    localStorage.setItem("oneMinuteGPSData", JSON.stringify(action.payload));
                    state.oneMinuteGPSData = action.payload;
                    break;
                default:
                    localStorage.setItem("oneMinuteTPSData", JSON.stringify(action.payload));
                    state.oneMinuteGTPSData = action.payload;
                    break;
            }
        },
    },
});
_a = liveDataSlice.actions, exports.setCurrentVisitors = _a.setCurrentVisitors, exports.setLiveDataSmoothing = _a.setLiveDataSmoothing, exports.setLiveDataType = _a.setLiveDataType, exports.setLiveData = _a.setLiveData, exports.setIncludeSidechains = _a.setIncludeSidechains, exports.setLastMinuteData = _a.setLastMinuteData;
exports.liveDataReducer = liveDataSlice.reducer;
