import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/DependenciesIOC";
import { DataPoint } from "../services/api-gen";
import { IMaxDataModel } from "../models/interfaces/IMaxDataModel";
import { DataPointDictionary } from "../Types";

const initialState: IMaxDataModel = {
  maxTPSData: {},
  maxGPSData: {},
  maxGTPSData: {},
};

function modifyMaxDataState(
  state: IMaxDataModel,
  finalState: DataPointDictionary | undefined,
  f: (state: IMaxDataModel) => DataPointDictionary | undefined
): IMaxDataModel {
  if (finalState === undefined) return state;

  let t = f(state);
  let target: DataPointDictionary = t as DataPointDictionary;
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
      action: PayloadAction<DataPointDictionary | undefined>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxTPSData);
    },
    setMaxGPSData(
      state: IMaxDataModel,
      action: PayloadAction<DataPointDictionary | undefined>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGPSData);
    },
    setMaxGTPSData(
      state: IMaxDataModel,
      action: PayloadAction<DataPointDictionary | undefined>
    ) {
      return modifyMaxDataState(state, action.payload, (s) => s.maxGTPSData);
    },
  },
});

export const { setMaxTPSData, setMaxGPSData, setMaxGTPSData } =
  dataSlice.actions;
export const dataReducer = dataSlice.reducer;
