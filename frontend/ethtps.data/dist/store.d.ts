import { TypedUseSelectorHook } from "react-redux";
export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<{
    providers: import("ethtps.api.client").ProviderResponseModel[];
    networks: string[];
    intervals: string[];
    maxData: import(".").IMaxDataModel;
    liveData: import(".").ILiveDataModeModel;
    colors: import(".").IColorDictionaries;
    experiments: number[];
    applicationState: import(".").IDataLoadingModel;
    websockets: import("./slices/WebsocketSubscriptionSlice").WebsocketSubscriptionState;
}, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<{
    providers: import("ethtps.api.client").ProviderResponseModel[];
    networks: string[];
    intervals: string[];
    maxData: import(".").IMaxDataModel;
    liveData: import(".").ILiveDataModeModel;
    colors: import(".").IColorDictionaries;
    experiments: number[];
    applicationState: import(".").IDataLoadingModel;
    websockets: import("./slices/WebsocketSubscriptionSlice").WebsocketSubscriptionState;
}, import("redux").AnyAction, undefined>, import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export declare const useAppDispatch: DispatchFunc;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export {};
