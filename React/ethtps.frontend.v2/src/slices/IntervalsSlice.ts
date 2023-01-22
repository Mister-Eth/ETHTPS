import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: Array<string> = [];

const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    setintervals(state: string[], action: PayloadAction<string[]>) {
      state.length = 0;
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});

export const { setintervals } = intervalsSlice.actions;
export const intervalsReducer = intervalsSlice.reducer;
