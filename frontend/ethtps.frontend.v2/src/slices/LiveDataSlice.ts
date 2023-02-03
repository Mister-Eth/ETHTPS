import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILiveDataModeModel } from "../models/interfaces/ILiveDataModeModel"
import { TimeInterval } from "../models/TimeIntervals"
import { DataType } from "../Types"
import {
  InstantDataResponseModel,
  DataResponseModelDictionary,
} from "../Types.dictionaries"
import { storage } from "../services/DependenciesIOC"

const initialState: ILiveDataModeModel = {
  liveDataSmoothing: TimeInterval.Instant,
  liveDataType: DataType.TPS,
  includeSidechains: storage.retrieveItem("includeSidechains") ?? false,
  oneMinuteTPSData: storage.retrieveItem("oneMinuteTPSData"),
  oneMinuteGPSData: storage.retrieveItem("oneMinuteGPSData"),
  oneMinuteGTPSData: storage.retrieveItem("oneMinuteGTPSData"),
}

const liveDataSlice = createSlice({
  name: "live data",
  initialState,
  reducers: {
    setLiveDataSmoothing(
      state: ILiveDataModeModel,
      action: PayloadAction<TimeInterval | undefined>,
    ) {
      if (action.payload === undefined) return state
      state.liveDataSmoothing = action.payload
    },

    setLiveDataType(
      state: ILiveDataModeModel,
      action: PayloadAction<DataType | undefined>,
    ) {
      if (action.payload === undefined) return state
      state.liveDataType = action.payload
    },

    setLiveData(
      state: ILiveDataModeModel,
      action: PayloadAction<InstantDataResponseModel | undefined>,
    ) {
      state.data = action.payload
    },

    setIncludeSidechains(
      state: ILiveDataModeModel,
      action: PayloadAction<boolean>,
    ) {
      if (action.payload === undefined) return state
      storage.cacheItem(action.payload, "includeSidechains")
      state.includeSidechains = action.payload
    },

    setLastMinuteData(
      state: ILiveDataModeModel,
      action: PayloadAction<DataResponseModelDictionary | undefined>,
    ) {
      switch (state.liveDataType) {
        case DataType.TPS:
          storage.cacheItem(action.payload, "oneMinuteTPSData")
          state.oneMinuteTPSData = action.payload
          break
        case DataType.GPS:
          storage.cacheItem(action.payload, "oneMinuteGPSData")
          state.oneMinuteGPSData = action.payload
          break
        default:
          storage.cacheItem(action.payload, "oneMinuteGTPSData")
          state.oneMinuteGTPSData = action.payload
          break
      }
    },
  },
})

export const {
  setLiveDataSmoothing,
  setLiveDataType,
  setLiveData,
  setIncludeSidechains,
  setLastMinuteData,
} = liveDataSlice.actions
export const liveDataReducer = liveDataSlice.reducer
