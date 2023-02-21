import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IColorDictionaries } from '../models/interfaces/IColorDictionaries'
import { StringDictionary } from '../common-types/Dictionaries'

const initialState: IColorDictionaries = JSON.parse(
	localStorage.getItem('IColorDictionaries') ?? '{}'
)

const colorSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		setProviderColorDictionary(
			state: IColorDictionaries,
			action: PayloadAction<StringDictionary | undefined>
		) {
			if (action.payload === undefined) return state

			state.providerColorDictionary = { ...action.payload }
			return state
		},
		setProviderTypeColorDictionary(
			state: IColorDictionaries,
			action: PayloadAction<StringDictionary | undefined>
		) {
			if (action.payload === undefined) return state
			action.payload['Others'] = 'yellow'
			localStorage.setItem(
				'IColorDictionaries',
				JSON.stringify(action.payload)
			)
			state.providerTypesColorDictionary = { ...action.payload }
			return state
		},
	},
})

export const { setProviderColorDictionary, setProviderTypeColorDictionary } =
	colorSlice.actions
export const colorReducer = colorSlice.reducer
