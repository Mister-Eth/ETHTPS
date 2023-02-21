import { DataType } from 'ethtps.api.client';
export declare function useGetMaxDataFromAppStore(): import("..").IMaxDataModel;
export declare function useGetMaxDataForProviderFromAppStore(provider: string, type: DataType): import("ethtps.api.client").DataPoint;
export declare function useGetMaxTPSDataFromAppStore(): import("..").DataPointDictionary;
export declare function useGetMaxGPSDataFromAppStore(): import("..").DataPointDictionary;
export declare function useGetMaxGTPSDataFromAppStore(): import("..").DataPointDictionary;
export declare function useGetNetworksFromAppStore(): string[];
