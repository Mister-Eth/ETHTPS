import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProviderModel } from "../models/interfaces/IProviderModel"
import { storage } from "../services/DependenciesIOC"
import { ProviderModel, ProviderResponseModel } from "ethtps.api.client"

const initialState: ProviderModel[] = storage.retrieveItem("providers") ?? []

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
      state: ProviderModel[],
      action: PayloadAction<ProviderResponseModel[] | undefined>,
    ) {
      storage.cacheItem(action.payload, "providers")
      return action.payload?.map((x) => {
        let result = {
          name: x?.name,
          type: x.type,
        }
        return result
      })
    },
  },
})

export const { addProvider, setProviders } = providersSlice.actions
export const providersReducer = providersSlice.reducer
