import { ILiveDataModeModel } from "../models/interfaces/ILiveDataModeModel";
import { TimeInterval } from "../models/TimeIntervals";
import { InstantDataResponseModel, DataResponseModelDictionary } from "../Types.dictionaries";
import { DataType } from "ethtps.api.client";
export declare const setCurrentVisitors: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<number, "live data/setCurrentVisitors">, setLiveDataSmoothing: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<TimeInterval, "live data/setLiveDataSmoothing">, setLiveDataType: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataType, "live data/setLiveDataType">, setLiveData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<InstantDataResponseModel, "live data/setLiveData">, setIncludeSidechains: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "live data/setIncludeSidechains">, setLastMinuteData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataResponseModelDictionary, "live data/setLastMinuteData">;
export declare const liveDataReducer: import("redux").Reducer<ILiveDataModeModel, import("redux").AnyAction>;
