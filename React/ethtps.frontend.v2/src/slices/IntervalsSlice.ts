import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const initialState: Array<string> = []

const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    setIntervals(state: string[], action: PayloadAction<string[] | undefined>) {
      if (action.payload === undefined) return state

      state.length = 0
      state = {
        ...action.payload,
      }
      return state
    },
  },
})

export const { setIntervals } = intervalsSlice.actions
export const intervalsReducer = intervalsSlice.reducer
