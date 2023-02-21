import { IDataLoadingModel } from '../models/interfaces/IDataLoadingModel';
export declare const setApplicationDataLoaded: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<boolean, "applicationStates/setApplicationDataLoaded">, setStoreAPIKey: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "applicationStates/setStoreAPIKey">;
export declare const applicationStateReducer: import("redux").Reducer<IDataLoadingModel, import("redux").AnyAction>;
