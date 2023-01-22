import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/DependenciesIOC";
import { DataPoint } from "../services/api-gen";
import { IMaxDataModel } from "../models/interfaces/IMaxDataModel";

const initialState: IMaxDataModel = {
  maxTPSData: {},
  maxGPSData: {},
  maxGTPSData: {},
};

function modifyMaxDataState(
  state: IMaxDataModel,
  finalState: { [key: string]: DataPoint },
  f: (state: IMaxDataModel) => { [key: string]: DataPoint }
): IMaxDataModel {
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
      state: IMaxDataModel,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxTPSData);
    },
    setMaxGPSData(
      state: IMaxDataModel,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGPSData);
    },
    setMaxGTPSData(
      state: IMaxDataModel,
      action: PayloadAction<{ [key: string]: DataPoint }>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGTPSData);
    },
  },
});

export const { setMaxTPSData, setMaxGPSData, setMaxGTPSData } =
  dataSlice.actions;
export const dataReducer = dataSlice.reducer;
