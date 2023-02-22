import { ProviderResponseModel } from 'ethtps.api.client';
import { DataResponseModelDictionary } from 'ethtps.data';
export type InstantBarChartDataset = {
    label: string;
    data: [number];
    borderColor: string;
    backgroundColor: string;
};
export type InstantBarChartData = {
    labels: [string];
    datasets: InstantBarChartDataset[];
};
export type LiveDataPoint = {
    providerName: string;
    providerColor: string;
    value: number;
};
export type LiveData = {
    mode: string;
    total: number;
    data: LiveDataPoint[];
    sidechainsIncluded: boolean;
};
export declare const createDataPoint: (data: DataResponseModelDictionary, provider: ProviderResponseModel, color: string) => LiveDataPoint;
export declare function useGet1mTPS(): DataResponseModelDictionary | undefined;
export declare function useGet1mGPS(): DataResponseModelDictionary | undefined;
export declare function useGet1mGTPS(): DataResponseModelDictionary | undefined;
export declare function useLiveDataState(): {
    smoothing: import("ethtps.api.client").TimeInterval;
    sidechainsIncluded: boolean;
    mode: import("ethtps.api.client").DataType;
};
export declare function useStreamchartData(interval: string): void;
export declare function useLiveData(): LiveData | undefined;
