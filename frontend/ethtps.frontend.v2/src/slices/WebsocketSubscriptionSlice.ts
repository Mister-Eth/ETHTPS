import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WebsocketSubscriptionState {
  isEstablishingConnection: boolean
  isConnecting: boolean
  isConnected: boolean
}

const initialState: WebsocketSubscriptionState = {
  isEstablishingConnection: false,
  isConnecting: false,
  isConnected: false,
}

const websocketSlice = createSlice({
  name: "websockets",
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
  },
})

export type WebsocketMessage = {
  type: WebsocketEvent
  payload?: any
}

export enum WebsocketEvent {
  KeepAlive = "keep_alive",
  ReceivedPingRequest = "ping_request",
  LiveDataReceived = "post_live_data",
}

export const websocketActions = websocketSlice.actions
export const websocketReducer = websocketSlice.reducer
export default websocketSlice
