import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/DependenciesIOC";
import { DataPoint } from "../services/api-gen";

interface IDataSliceState {
  maxTPSData: { [key: string]: DataPoint };
  maxGPSData: { [key: string]: DataPoint };
  maxGTPSData: { [key: string]: DataPoint };
}

const initialState: IDataSliceState = {
  maxTPSData: {},
  maxGPSData: {},
  maxGTPSData: {},
};

function modifyMaxDataState(
  state: IDataSliceState,
  finalState: { [key: string]: DataPoint },
  f: (state: IDataSliceState) => { [key: string]: DataPoint }
): IDataSliceState {
  let target = f(state);
  let keys = Object.keys(target);
  for (let i = 0; i < keys.length; i++) {
    delete target[keys[i]];
  }

  keys = Object.keys(finalState);
  for (let index = 0; index < keys.length; index++) {
    target[keys[index]] = finalState[keys[index]];
  }
  return state;
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setMaxTPSData(
      state: IDataSliceState,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxTPSData);
    },
    setMaxGPSData(
      state: IDataSliceState,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGPSData);
    },
    setMaxGTPSData(
      state: IDataSliceState,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGTPSData);
    },
  },
});

export const { setMaxTPSData, setMaxGPSData, setMaxGTPSData } =
  dataSlice.actions;
export const dataReducer = dataSlice.reducer;
