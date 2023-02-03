import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProviderModel } from "../models/interfaces/IProviderModel"
import { storage } from "../services/DependenciesIOC"
import { ProviderResponseModel, ProviderModel } from "ethtps.api.client"

const initialState: ProviderResponseModel[] =
  storage.retrieveItem("providers") ?? []

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    addProvider: (
      state: ProviderModel[],
      action: PayloadAction<IProviderModel>,
    ) => {
      state = [...state, action.payload]
      return [...state]
    },
    setProviders(
      state: ProviderResponseModel[],
      action: PayloadAction<ProviderResponseModel[] | undefined>,
    ) {
      storage.cacheItem(action.payload, "providers")
      return action.payload
    },
  },
})

export const { addProvider, setProviders } = providersSlice.actions
export const providersReducer = providersSlice.reducer
