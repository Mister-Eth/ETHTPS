import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const initialState: Array<string> = JSON.parse(
	localStorage.getItem('intervals') ?? '[]'
)

const intervalsSlice = createSlice({
	name: 'intervals',
	initialState,
	reducers: {
		setIntervals(
			state: string[],
			action: PayloadAction<string[] | undefined>
		) {
			if (action.payload !== undefined) {
				localStorage.setItem(
					'intervals',
					JSON.stringify(action.payload)
				)
				state.length = 0
				state = [...action.payload]
			}
		},
	},
})

export const { setIntervals } = intervalsSlice.actions
export const intervalsReducer = intervalsSlice.reducer
