import { ProviderResponseModel } from "ethtps.api.client";
export declare const addProvider: import("@reduxjs/toolkit").ActionCreatorWithNonInferrablePayload<"providers/addProvider">, setProviders: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<ProviderResponseModel[], "providers/setProviders">;
export declare const providersReducer: import("redux").Reducer<ProviderResponseModel[], import("redux").AnyAction>;
