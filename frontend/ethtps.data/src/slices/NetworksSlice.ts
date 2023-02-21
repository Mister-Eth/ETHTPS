import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const initialState: Array<string> = JSON.parse(
	localStorage.getItem('networks') ?? '[]'
)

const networksSlice = createSlice({
	name: 'networks',
	initialState,
	reducers: {
		setNetworks(
			state: string[],
			action: PayloadAction<string[] | undefined>
		) {
			if (action.payload !== undefined) {
				localStorage.setItem('networks', JSON.stringify(action.payload))
				state.length = 0
				state = [...(action.payload as string[])]
			}
		},
	},
})

export const { setNetworks } = networksSlice.actions
export const networksReducer = networksSlice.reducer
