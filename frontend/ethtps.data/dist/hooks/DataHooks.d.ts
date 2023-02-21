import { DataType } from "ethtps.api.client";
export declare function useGetMaxDataFromAppStore(): import("..").IMaxDataModel;
export declare function useGetMaxDataForProviderFromAppStore(provider: string, type: DataType): import("ethtps.api.client").DataPoint;
export declare function useGetMaxTPSDataFromAppStore(): import("../Types.dictionaries").DataPointDictionary;
export declare function useGetMaxGPSDataFromAppStore(): import("../Types.dictionaries").DataPointDictionary;
export declare function useGetMaxGTPSDataFromAppStore(): import("../Types.dictionaries").DataPointDictionary;
export declare function useGetNetworksFromAppStore(): string[];
