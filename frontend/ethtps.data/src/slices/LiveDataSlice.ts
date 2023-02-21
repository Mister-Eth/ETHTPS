import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILiveDataModeModel } from "../models/interfaces/ILiveDataModeModel";
import { TimeInterval } from "../models/TimeIntervals";
import {
  InstantDataResponseModel,
  DataResponseModelDictionary,
} from "../Types.dictionaries";
import { DataType } from "ethtps.api.client";

const initialState: ILiveDataModeModel = {
  liveDataSmoothing: TimeInterval.Instant,
  liveDataType: DataType.Tps,
  includeSidechains:
    JSON.parse(localStorage.getItem("includeSidechains")) ?? false,
  oneMinuteTPSData: JSON.parse(localStorage.getItem("oneMinuteTPSData")),
  oneMinuteGPSData: JSON.parse(localStorage.getItem("oneMinuteGPSData")),
  oneMinuteGTPSData: JSON.parse(localStorage.getItem("oneMinuteGTPSData")),
  currentVisitors: 0,
};

const liveDataSlice = createSlice({
  name: "live data",
  initialState,
  reducers: {
    setCurrentVisitors(
      state: ILiveDataModeModel,
      action: PayloadAction<number | undefined>
    ) {
      state.currentVisitors = action.payload ?? 1;
    },

    setLiveDataSmoothing(
      state: ILiveDataModeModel,
      action: PayloadAction<TimeInterval | undefined>
    ) {
      if (action.payload === undefined) return state;
      state.liveDataSmoothing = action.payload;
    },

    setLiveDataType(
      state: ILiveDataModeModel,
      action: PayloadAction<DataType | undefined>
    ) {
      if (action.payload === undefined) return state;
      state.liveDataType = action.payload;
    },

    setLiveData(
      state: ILiveDataModeModel,
      action: PayloadAction<InstantDataResponseModel | undefined>
    ) {
      if (!action.payload) return state;
      state.data = action.payload;
    },

    setIncludeSidechains(
      state: ILiveDataModeModel,
      action: PayloadAction<boolean | undefined>
    ) {
      localStorage.cacheItem(action.payload, "includeSidechains");
      state.includeSidechains = action.payload ?? false;
    },

    setLastMinuteData(
      state: ILiveDataModeModel,
      action: PayloadAction<DataResponseModelDictionary | undefined>
    ) {
      switch (state.liveDataType) {
        case DataType.Tps:
          localStorage.cacheItem(action.payload, "oneMinuteTPSData");
          state.oneMinuteTPSData = action.payload;
          break;
        case DataType.Gps:
          localStorage.cacheItem(action.payload, "oneMinuteGPSData");
          state.oneMinuteGPSData = action.payload;
          break;
        default:
          localStorage.cacheItem(action.payload, "oneMinuteTPSData");
          state.oneMinuteGTPSData = action.payload;
          break;
      }
    },
  },
});

export const {
  setCurrentVisitors,
  setLiveDataSmoothing,
  setLiveDataType,
  setLiveData,
  setIncludeSidechains,
  setLastMinuteData,
} = liveDataSlice.actions;

export const liveDataReducer = liveDataSlice.reducer;
