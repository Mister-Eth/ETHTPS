import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/DependenciesIOC";
const initialState: Array<string> = [];

const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    setIntervals(state: string[], action: PayloadAction<string[]>) {
      state.length = 0;
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});

export const { setIntervals } = intervalsSlice.actions;
export const intervalsReducer = intervalsSlice.reducer;
