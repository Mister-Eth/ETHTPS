import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setReconnect } from '../models/services/DependenciesIOC'

export interface WebsocketSubscriptionState {
	isEstablishingConnection: boolean
	isConnecting: boolean
	isConnected: boolean
	wsURL?: string
}

const initialState: WebsocketSubscriptionState = {
	isEstablishingConnection: false,
	isConnecting: false,
	isConnected: false,
}

const websocketSlice = createSlice({
	name: 'websockets',
	initialState,
	reducers: {
		connecting: (state) => {
			state.isConnecting = true
			state.isConnected = false
		},
		connected: (state) => {
			state.isConnected = true
			state.isConnecting = false
		},
		disconnected: (state) => {
			state.isConnecting = false
			state.isConnected = false
		},
		setWSURL(
			state: WebsocketSubscriptionState,
			action: PayloadAction<string | undefined>
		) {
			state.wsURL = action.payload
			setReconnect(true)
			return state
		},
	},
})

export type WebsocketMessage = {
	type: WebsocketEvent
	payload?: any
}

export enum WebsocketEvent {
	KeepAlive = 'keep_alive',
	ReceivedPingRequest = 'ping_request',
	LiveDataReceived = 'post_live_data',
	VisitorCountChanged = 'new_visitor_count',
}

export const websocketActions = websocketSlice.actions
export const websocketReducer = websocketSlice.reducer
export default websocketSlice
