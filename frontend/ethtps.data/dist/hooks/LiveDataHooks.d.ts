import { DataType } from 'ethtps.api.client';
export declare function useGetLiveDataModeFromAppStore(): DataType;
export declare function useGetLiveDataSmoothingFromAppStore(): import("ethtps.api.client").TimeInterval;
export declare function useGetLiveDataFromAppStore(): import("..").InstantDataResponseModel;
export declare function useSetDataModeMutation(mode: DataType): void;
export declare function useUpdateLiveData(updateRateMs: number): void;
export declare function useGetSidechainsIncludedFromAppStore(): boolean;
export declare function useSetSidechainsIncluded(value: boolean): void;
