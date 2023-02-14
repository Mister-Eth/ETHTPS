import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { storage } from "../services/DependenciesIOC"

const initialState: number[] = storage.retrieveItem("experiments") ?? []

const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setExperiments(
      state: number[],
      action: PayloadAction<number[] | undefined>,
    ) {
      storage.cacheItem(action.payload, "experiments")
      return action.payload
    },
  },
})

export const { setExperiments } = experimentSlice.actions
export const experimentReducer = experimentSlice.reducer
