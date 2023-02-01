import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: number[] = []

const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setExperiments(
      state: number[],
      action: PayloadAction<number[] | undefined>,
    ) {
      if (action.payload === undefined) return state

      state.length = 0
      state = [...action.payload]
      return state
    },
  },
})

export const { setExperiments } = experimentSlice.actions
export const experimentReducer = experimentSlice.reducer
