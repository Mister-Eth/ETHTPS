"use strict";
var _a;
var _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataReducer = exports.setMaxGTPSData = exports.setMaxGPSData = exports.setMaxTPSData = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const ethtps_api_client_1 = require("ethtps.api.client");
const initialState = {
    maxTPSData: JSON.parse((_b = localStorage.getItem('maxTPSData')) !== null && _b !== void 0 ? _b : '{}'),
    maxGPSData: JSON.parse((_c = localStorage.getItem('maxGPSData')) !== null && _c !== void 0 ? _c : '{}'),
    maxGTPSData: JSON.parse((_d = localStorage.getItem('maxGTPSData')) !== null && _d !== void 0 ? _d : '{}'),
    getMaxDataFor(provider, type) {
        switch (type) {
            case ethtps_api_client_1.DataType.Tps:
                if (this.maxTPSData !== undefined &&
                    Object.keys(this.maxGPSData).some((x) => x === provider))
                    return this.maxTPSData[provider];
                else
                    break;
            case ethtps_api_client_1.DataType.Gps:
                if (this.maxGPSData !== undefined &&
                    Object.keys(this.maxGPSData).some((x) => x === provider))
                    return this.maxGPSData[provider];
                else
                    break;
            case ethtps_api_client_1.DataType.GasAdjustedTps:
                if (this.maxGTPSData !== undefined &&
                    Object.keys(this.maxGTPSData).some((x) => x === provider))
                    return this.maxGTPSData[provider];
                else
                    break;
        }
    },
};
function modifyMaxDataState(state, finalState, f) {
    if (finalState === undefined)
        return state;
    let t = f(state);
    let target = t;
    let keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
        delete target[keys[i]];
    }
    keys = Object.keys(finalState);
    for (let index = 0; index < keys.length; index++) {
        target[keys[index]] = finalState[keys[index]];
    }
    return state;
}
const dataSlice = (0, toolkit_1.createSlice)({
    name: 'data',
    initialState,
    reducers: {
        setMaxTPSData(state, action) {
            localStorage.setItem('maxTPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, (s) => s.maxTPSData);
        },
        setMaxGPSData(state, action) {
            localStorage.setItem('maxGPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, (s) => s.maxGPSData);
        },
        setMaxGTPSData(state, action) {
            localStorage.setItem('maxGTPSData', JSON.stringify(action.payload));
            return modifyMaxDataState(state, action.payload, (s) => s.maxGTPSData);
        },
    },
});
_a = dataSlice.actions, exports.setMaxTPSData = _a.setMaxTPSData, exports.setMaxGPSData = _a.setMaxGPSData, exports.setMaxGTPSData = _a.setMaxGTPSData;
exports.dataReducer = dataSlice.reducer;
