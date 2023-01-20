import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IProviderModel } from "../models/interfaces/IProviderModel";
import { ProviderModel } from '../services/api-gen/models/ProviderModel';
import { ApplicationState } from '../models/dependencies/ApplicationState';

const initialState = new ApplicationState()

const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        getProviders: (state: ApplicationState) => {
            //  state.
            //[...state, new ProviderModel()]
        }
    }
})

const { getProviders } = providersSlice.actions
const providersReducer = providersSlice.reducer
export const store = configureStore({
    reducer: { providers: providersReducer }
})