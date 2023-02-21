import ReconnectingWebSocket from 'reconnecting-websocket'

export const wsBaseURL = 'ws://localhost:2000/LiveData?XAPIKey='
export let rws: ReconnectingWebSocket = undefined
export const setRWS = (ws: ReconnectingWebSocket) => {
	rws = ws
}
export let reconnect: boolean = false
export const setReconnect = (value: boolean) => {
	reconnect = value
}
