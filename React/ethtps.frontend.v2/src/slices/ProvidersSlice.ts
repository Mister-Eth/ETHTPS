import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { IProviderModel } from "../models/interfaces/IProviderModel";
import { ProviderModel } from '../services/api-gen/models/ProviderModel';
import { ApplicationState } from '../models/dependencies/ApplicationState';
import { useAppSelector, useAppDispatch } from '../store';

const initialState = [
    new ProviderModel()
]

const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        addProvider: (state: ProviderModel[], action: PayloadAction<IProviderModel>) => {
            state = [...state, action.payload]
            return [...state]
        }
    }
})

export const { addProvider } = providersSlice.actions
export const providersReducer = providersSlice.reducer