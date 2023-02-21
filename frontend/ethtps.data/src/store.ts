import { providersReducer } from './slices/ProvidersSlice'
import { networksReducer } from './slices/NetworksSlice'
import { intervalsReducer } from './slices/IntervalsSlice'
import { dataReducer } from './slices/DataSlice'
import { liveDataReducer } from './slices/LiveDataSlice'
import { colorReducer } from './slices/ColorSlice'
import { experimentReducer } from './slices/ExperimentSlice'
import { applicationStateReducer } from './slices/ApplicationStateSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import websocketMiddleware from './slices/WebsocketSubscriptionMiddleware'
import { websocketReducer } from './slices/WebsocketSubscriptionSlice'
import { configureStore } from '@reduxjs/toolkit'
import {
	ApplicationState,
	IApplicationState,
} from './models/dependencies/ApplicationState'

const preloadedState = new ApplicationState()
export const store = configureStore({
	reducer: {
		providers: providersReducer,
		networks: networksReducer,
		intervals: intervalsReducer,
		maxData: dataReducer,
		liveData: liveDataReducer,
		colors: colorReducer,
		experiments: experimentReducer,
		applicationState: applicationStateReducer,
		websockets: websocketReducer,
	},
	...(preloadedState as IApplicationState),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(websocketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
