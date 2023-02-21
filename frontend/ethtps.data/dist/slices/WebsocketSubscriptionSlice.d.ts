export interface WebsocketSubscriptionState {
    isEstablishingConnection: boolean;
    isConnecting: boolean;
    isConnected: boolean;
}
declare const websocketSlice: import("@reduxjs/toolkit").Slice<WebsocketSubscriptionState, {
    connecting: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
    connected: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
    disconnected: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
}, "websockets">;
export type WebsocketMessage = {
    type: WebsocketEvent;
    payload?: any;
};
export declare enum WebsocketEvent {
    KeepAlive = "keep_alive",
    ReceivedPingRequest = "ping_request",
    LiveDataReceived = "post_live_data",
    VisitorCountChanged = "new_visitor_count"
}
export declare const websocketActions: import("@reduxjs/toolkit").CaseReducerActions<{
    connecting: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
    connected: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
    disconnected: (state: import("immer/dist/internal").WritableDraft<WebsocketSubscriptionState>) => void;
}, "websockets">;
export declare const websocketReducer: import("redux").Reducer<WebsocketSubscriptionState, import("redux").AnyAction>;
export default websocketSlice;
