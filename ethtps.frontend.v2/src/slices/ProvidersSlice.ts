import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProviderModel } from "../models/interfaces/IProviderModel"
import { ProviderModel } from "../services/api-gen/models/ProviderModel"
import { ProviderResponseModel } from "../services/api-gen"

const initialState: ProviderModel[] = []

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
      return action.payload?.map((x) => {
        let result = new ProviderModel()
        result.name = x?.name
        result.type = x?.type
        return result
      })
    },
  },
})

export const { addProvider, setProviders } = providersSlice.actions
export const providersReducer = providersSlice.reducer
