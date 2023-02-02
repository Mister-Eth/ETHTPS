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
      if (action.payload === undefined) return state

      storage.cacheItem(action.payload, "experiments")
      state.length = 0
      state = [...action.payload]
    },
  },
})

export const { setExperiments } = experimentSlice.actions
export const experimentReducer = experimentSlice.reducer
