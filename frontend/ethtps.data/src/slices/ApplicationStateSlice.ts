import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDataLoadingModel } from '../models/interfaces/IDataLoadingModel'

const initialState: IDataLoadingModel = {
	applicationDataLoaded: false,
	completeApplicationDataAvailableInLocalStorage: false,
	apiKey: localStorage.getItem('XAPIKey'),
}

const applicationStateSlice = createSlice({
	name: 'applicationStates',
	initialState,
	reducers: {
		setApplicationDataLoaded(
			state: IDataLoadingModel,
			action: PayloadAction<boolean | undefined>
		) {
			if (action.payload === undefined) return state

			state.applicationDataLoaded = action.payload
			return state
		},
		setStoreAPIKey(
			state: IDataLoadingModel,
			action: PayloadAction<string | undefined>
		) {
			localStorage.setItem('XAPIKey', action.payload)
			state.apiKey = action.payload
			return state
		},
	},
})

export const { setApplicationDataLoaded, setStoreAPIKey } =
	applicationStateSlice.actions
export const applicationStateReducer = applicationStateSlice.reducer
