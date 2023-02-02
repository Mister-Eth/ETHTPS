import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { storage } from "../services/DependenciesIOC"
const initialState: Array<string> = storage.retrieveItem("intervals") ?? []

const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    setIntervals(state: string[], action: PayloadAction<string[] | undefined>) {
      if (action.payload !== undefined) {
        storage.cacheItem(action.payload, "intervals")
        state.length = 0
        state = [...action.payload]
      }
    },
  },
})

export const { setIntervals } = intervalsSlice.actions
export const intervalsReducer = intervalsSlice.reducer
