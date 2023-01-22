import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: Array<string> = [];

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    setNetworks(state: string[], action: PayloadAction<string[]>) {
      state.length = 0;
      state = {
        ...action.payload,
      };
      return state;
    },
  },
});

export const { setNetworks } = networksSlice.actions;
export const networksReducer = networksSlice.reducer;
