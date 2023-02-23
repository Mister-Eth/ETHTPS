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
export declare function useGet1mTPS(): any;
export declare function useGet1mGPS(): any;
export declare function useGet1mGTPS(): any;
export declare function useLiveDataState(): {
    smoothing: any;
    sidechainsIncluded: boolean;
    mode: DataType;
};
export declare function useStreamchartData(interval: string): void;
export declare function useLiveData(): LiveData;
