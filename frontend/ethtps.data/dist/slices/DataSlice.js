"use strict";
var _a;
var _b, _c, _d;
exports.__esModule = true;
exports.dataReducer = exports.setMaxGTPSData = exports.setMaxGPSData = exports.setMaxTPSData = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var ethtps_api_client_1 = require("ethtps.api.client");
var initialState = {
    maxTPSData: JSON.parse((_b = localStorage.getItem('maxTPSData')) !== null && _b !== void 0 ? _b : '{}'),
    maxGPSData: JSON.parse((_c = localStorage.getItem('maxGPSData')) !== null && _c !== void 0 ? _c : '{}'),
    maxGTPSData: JSON.parse((_d = localStorage.getItem('maxGTPSData')) !== null && _d !== void 0 ? _d : '{}'),
    getMaxDataFor: function (provider, type) {
        switch (type) {
            case ethtps_api_client_1.DataType.Tps:
                if (this.maxTPSData !== undefined &&
                    Object.keys(this.maxGPSData).some(function (x) { return x === provider; }))
                    return this.maxTPSData[provider];
                else
                    break;
            case ethtps_api_client_1.DataType.Gps:
                if (this.maxGPSData !== undefined &&
                    Object.keys(this.maxGPSData).some(function (x) { return x === provider; }))
                    return this.maxGPSData[provider];
                else
                    break;
            case ethtps_api_client_1.DataType.GasAdjustedTps:
                if (this.maxGTPSData !== undefined &&
                    Object.keys(this.maxGTPSData).some(function (x) { return x === provider; }))
                    return this.maxGTPSData[provider];
                else
                    break;
        }
    }
};
function modifyMaxDataState(state, finalState, f) {
    if (finalState === undefined)
        return state;
    var t = f(state);
    var target = t;
    var keys = Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        delete target[keys[i]];
    }
    keys = Object.keys(finalState);
    for (var index = 0; index < keys.length; index++) {
        target[keys[index]] = finalState[keys[index]];
    }
    return state;
}
var dataSlice = (0, toolkit_1.createSlice)({
    name: 'data',
    initialState: initialState,
    reducers: {
        setMaxTPSData: function (state, action) {
            localStorage.setItem('maxTPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, function (s) { return s.maxTPSData; });
        },
        setMaxGPSData: function (state, action) {
            localStorage.setItem('maxGPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, function (s) { return s.maxGPSData; });
        },
        setMaxGTPSData: function (state, action) {
            localStorage.setItem('maxGTPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, function (s) { return s.maxGTPSData; });
        }
    }
});
exports.setMaxTPSData = (_a = dataSlice.actions, _a.setMaxTPSData), exports.setMaxGPSData = _a.setMaxGPSData, exports.setMaxGTPSData = _a.setMaxGTPSData;
exports.dataReducer = dataSlice.reducer;
//# sourceMappingURL=DataSlice.js.map