import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILiveDataModeModel } from "../models/interfaces/ILiveDataModeModel"
import { TimeInterval } from "../models/TimeIntervals"
import { DataType } from "../Types"
import { InstantDataResponseModel } from "../Types.dictionaries"

const initialState: ILiveDataModeModel = {
  liveDataSmoothing: TimeInterval.Instant,
  liveDataType: DataType.TPS,
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
      return state
    },

    setLiveDataType(
      state: ILiveDataModeModel,
      action: PayloadAction<DataType | undefined>,
    ) {
      if (action.payload === undefined) return state
      state.liveDataType = action.payload
      return state
    },

    setLiveData(
      state: ILiveDataModeModel,
      action: PayloadAction<InstantDataResponseModel | undefined>,
    ) {
      state.data = action.payload
      return state
    },
  },
})

export const { setLiveDataSmoothing, setLiveDataType, setLiveData } =
  liveDataSlice.actions
export const liveDataReducer = liveDataSlice.reducer
