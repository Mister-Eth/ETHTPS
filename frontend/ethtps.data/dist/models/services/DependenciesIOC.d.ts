import ReconnectingWebSocket from 'reconnecting-websocket';
export declare const wsBaseURL = "ws://localhost:2000/LiveData?XAPIKey=";
export declare let rws: ReconnectingWebSocket;
export declare const setRWS: (ws: ReconnectingWebSocket) => void;
export declare let reconnect: boolean;
export declare const setReconnect: (value: boolean) => void;
