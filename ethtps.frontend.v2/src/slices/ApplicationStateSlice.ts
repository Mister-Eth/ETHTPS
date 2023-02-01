import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IDataLoadingModel } from "../models/interfaces/IDataLoadingModel"
import { StringDictionary } from "../Types.dictionaries"

const initialState: IDataLoadingModel = {
  applicationDataLoaded: false,
  completeApplicationDataAvailableInLocalStorage: false,
}

const applicationStateSlice = createSlice({
  name: "applicationStates",
  initialState,
  reducers: {
    setApplicationDataLoaded(
      state: IDataLoadingModel,
      action: PayloadAction<boolean | undefined>,
    ) {
      if (action.payload === undefined) return state

      state.applicationDataLoaded = action.payload
      return state
    },
  },
})

export const { setApplicationDataLoaded } = applicationStateSlice.actions
export const applicationStateReducer = applicationStateSlice.reducer
