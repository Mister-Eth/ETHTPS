import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: number[] = JSON.parse(
  localStorage.getItem("experiments") ?? "[]"
);

const experimentSlice = createSlice({
  name: "experiments",
  initialState,
  reducers: {
    setExperiments(
      state: number[],
      action: PayloadAction<number[] | undefined>
    ) {
      localStorage.cacheItem(action.payload, "experiments");
      return action.payload;
    },
  },
});

export const { setExperiments } = experimentSlice.actions;
export const experimentReducer = experimentSlice.reducer;
