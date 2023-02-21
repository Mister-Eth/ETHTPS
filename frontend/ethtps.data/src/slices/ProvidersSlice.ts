import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProviderModel } from '../models/interfaces/IProviderModel'
import { ProviderResponseModel } from 'ethtps.api.client'

const initialState: ProviderResponseModel[] = JSON.parse(
	localStorage.getItem('providers') ?? '[]'
)

const providersSlice = createSlice({
	name: 'providers',
	initialState,
	reducers: {
		addProvider: (
			state: ProviderResponseModel[],
			action: PayloadAction<ProviderResponseModel>
		) => {
			state = [...state, action.payload]
			return [...state]
		},
		setProviders(
			state: ProviderResponseModel[],
			action: PayloadAction<ProviderResponseModel[] | undefined>
		) {
			localStorage.setItem('providers', JSON.stringify(action.payload))
			return action.payload
		},
	},
})

export const { addProvider, setProviders } = providersSlice.actions
export const providersReducer = providersSlice.reducer
