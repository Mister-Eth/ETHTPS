"use strict";
var _a;
var _b, _c, _d, _e;
exports.__esModule = true;
exports.liveDataReducer = exports.setLastMinuteData = exports.setIncludeSidechains = exports.setLiveData = exports.setLiveDataType = exports.setLiveDataSmoothing = exports.setCurrentVisitors = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var ethtps_api_client_1 = require("ethtps.api.client");
var initialState = {
    liveDataSmoothing: ethtps_api_client_1.TimeInterval.Instant,
    liveDataType: ethtps_api_client_1.DataType.Tps,
    includeSidechains: JSON.parse((_b = localStorage.getItem('includeSidechains')) !== null && _b !== void 0 ? _b : 'false'),
    oneMinuteTPSData: JSON.parse((_c = localStorage.getItem('oneMinuteTPSData')) !== null && _c !== void 0 ? _c : '{}'),
    oneMinuteGPSData: JSON.parse((_d = localStorage.getItem('oneMinuteGPSData')) !== null && _d !== void 0 ? _d : '{}'),
    oneMinuteGTPSData: JSON.parse((_e = localStorage.getItem('oneMinuteGTPSData')) !== null && _e !== void 0 ? _e : '{}'),
    currentVisitors: 0
};
var liveDataSlice = (0, toolkit_1.createSlice)({
    name: 'live data',
    initialState: initialState,
    reducers: {
        setCurrentVisitors: function (state, action) {
            var _a;
            state.currentVisitors = (_a = action.payload) !== null && _a !== void 0 ? _a : 1;
        },
        setLiveDataSmoothing: function (state, action) {
            if (action.payload === undefined)
                return state;
            state.liveDataSmoothing = action.payload;
        },
        setLiveDataType: function (state, action) {
            if (action.payload === undefined)
                return state;
            state.liveDataType = action.payload;
        },
        setLiveData: function (state, action) {
            if (!action.payload)
                return state;
            state.data = action.payload;
        },
        setIncludeSidechains: function (state, action) {
            var _a;
            localStorage.setItem('includeSidechains', JSON.stringify(action.payload));
            state.includeSidechains = (_a = action.payload) !== null && _a !== void 0 ? _a : false;
        },
        setLastMinuteData: function (state, action) {
            switch (state.liveDataType) {
                case ethtps_api_client_1.DataType.Tps:
                    localStorage.setItem('oneMinuteTPSData', JSON.stringify(action.payload));
                    state.oneMinuteTPSData = action.payload;
                    break;
                case ethtps_api_client_1.DataType.Gps:
                    localStorage.setItem('oneMinuteGPSData', JSON.stringify(action.payload));
                    state.oneMinuteGPSData = action.payload;
                    break;
                default:
                    localStorage.setItem('oneMinuteTPSData', JSON.stringify(action.payload));
                    state.oneMinuteGTPSData = action.payload;
                    break;
            }
        }
    }
});
exports.setCurrentVisitors = (_a = liveDataSlice.actions, _a.setCurrentVisitors), exports.setLiveDataSmoothing = _a.setLiveDataSmoothing, exports.setLiveDataType = _a.setLiveDataType, exports.setLiveData = _a.setLiveData, exports.setIncludeSidechains = _a.setIncludeSidechains, exports.setLastMinuteData = _a.setLastMinuteData;
exports.liveDataReducer = liveDataSlice.reducer;
//# sourceMappingURL=LiveDataSlice.js.map