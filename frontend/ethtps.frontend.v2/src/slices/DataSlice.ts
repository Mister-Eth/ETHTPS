import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DataPointDictionary } from "../Types.dictionaries"
import { IMaxDataModel } from "../models/interfaces/IMaxDataModel"
import { storage } from "../services/DependenciesIOC"
import { DataType } from "ethtps.api.client"

const initialState: IMaxDataModel = {
  maxTPSData: storage.retrieveItem("maxTPSData") ?? {},
  maxGPSData: storage.retrieveItem("maxGPSData") ?? {},
  maxGTPSData: storage.retrieveItem("maxGTPSData") ?? {},
  getMaxDataFor(provider, type) {
    switch (type) {
      case DataType.Tps:
        if (
          this.maxTPSData !== undefined &&
          Object.keys(this.maxGPSData as DataPointDictionary).some(
            (x) => x === provider,
          )
        )
          return this.maxTPSData[provider]
        else break
      case DataType.Gps:
        if (
          this.maxGPSData !== undefined &&
          Object.keys(this.maxGPSData as DataPointDictionary).some(
            (x) => x === provider,
          )
        )
          return this.maxGPSData[provider]
        else break
      case DataType.GasAdjustedTps:
        if (
          this.maxGTPSData !== undefined &&
          Object.keys(this.maxGTPSData as DataPointDictionary).some(
            (x) => x === provider,
          )
        )
          return this.maxGTPSData[provider]
        else break
    }
  },
}

function modifyMaxDataState(
  state: IMaxDataModel,
  finalState: DataPointDictionary | undefined,
  f: (state: IMaxDataModel) => DataPointDictionary | undefined,
): IMaxDataModel {
  if (finalState === undefined) return state

  let t = f(state)
  let target: DataPointDictionary = t as DataPointDictionary
  let keys = Object.keys(target)
  for (let i = 0; i < keys.length; i++) {
    delete target[keys[i]]
  }

  keys = Object.keys(finalState)
  for (let index = 0; index < keys.length; index++) {
    target[keys[index]] = finalState[keys[index]]
  }
  return state
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setMaxTPSData(
      state: IMaxDataModel,
      action: PayloadAction<DataPointDictionary | undefined>,
    ) {
      storage.cacheItem(action.payload, "maxTPSData")
      return modifyMaxDataState(state, action.payload, (s) => s.maxTPSData)
    },
    setMaxGPSData(
      state: IMaxDataModel,
      action: PayloadAction<DataPointDictionary | undefined>,
    ) {
      storage.cacheItem(action.payload, "maxGPSData")
      return modifyMaxDataState(state, action.payload, (s) => s.maxGPSData)
    },
    setMaxGTPSData(
      state: IMaxDataModel,
      action: PayloadAction<DataPointDictionary | undefined>,
    ) {
      storage.cacheItem(action.payload, "maxGTPSData")
      return modifyMaxDataState(state, action.payload, (s) => s.maxGTPSData)
    },
  },
})

export const { setMaxTPSData, setMaxGPSData, setMaxGTPSData } =
  dataSlice.actions
export const dataReducer = dataSlice.reducer
