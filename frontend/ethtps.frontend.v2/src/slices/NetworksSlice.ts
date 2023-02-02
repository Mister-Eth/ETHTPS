import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { storage } from "../services/DependenciesIOC"
import { act } from "react-dom/test-utils"
const initialState: Array<string> = storage.retrieveItem("networks") ?? []

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    setNetworks(state: string[], action: PayloadAction<string[] | undefined>) {
      if (action.payload !== undefined) {
        storage.cacheItem(action.payload, "networks")
        state.length = 0
        state = [...(action.payload as string[])]
      }
    },
  },
})

export const { setNetworks } = networksSlice.actions
export const networksReducer = networksSlice.reducer
