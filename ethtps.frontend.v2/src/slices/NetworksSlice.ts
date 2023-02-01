import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const initialState: Array<string> = []

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    setNetworks(state: string[], action: PayloadAction<string[] | undefined>) {
      return action.payload
    },
  },
})

export const { setNetworks } = networksSlice.actions
export const networksReducer = networksSlice.reducer
