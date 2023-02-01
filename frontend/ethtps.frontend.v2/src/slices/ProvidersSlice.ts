import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProviderModel } from "../models/interfaces/IProviderModel"
import { ProviderModel, ProviderResponseModel } from "../services/api-gen/src"

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
