import { extractData, useAppSelector, getModeData, dataTypeToString, } from 'ethtps.data';
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
import { useGetLiveDataSmoothingFromAppStore, useGetSidechainsIncludedFromAppStore, useGetLiveDataModeFromAppStore, useGetLiveDataFromAppStore, } from 'ethtps.data/dist/hooks/LiveDataHooks';
import { useGetProvidersFromAppStore } from 'ethtps.data/dist/hooks/ProviderHooks';
import { useState, useEffect } from 'react';
export const createDataPoint = (data, provider, color) => {
    let value = extractData(data, provider.name);
    return {
        providerName: provider.name,
        providerColor: color,
        value,
    };
};
export function useGet1mTPS() {
    return useAppSelector((state) => state.liveData.oneMinuteTPSData);
}
export function useGet1mGPS() {
    return useAppSelector((state) => state.liveData.oneMinuteGPSData);
}
export function useGet1mGTPS() {
    return useAppSelector((state) => state.liveData.oneMinuteGTPSData);
}
export function useLiveDataState() {
    const smoothing = useGetLiveDataSmoothingFromAppStore();
    const sidechainsIncluded = useGetSidechainsIncludedFromAppStore();
    const mode = useGetLiveDataModeFromAppStore();
    return { smoothing, sidechainsIncluded, mode };
}
export function useStreamchartData(interval) {
    /*
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const { data, status, refetch } = useQuery("get streamchart data", () =>
    api.getStreamChartData({
      interval: TimeIntervalFromJSON(`"${interval}"`),
      includeSidechains: sidechainsIncluded,
    }),
  )
  useEffect(() => {
    refetch()
  }, [sidechainsIncluded])*/
    //return { data, status }
}
export function useLiveData() {
    const providers = useGetProvidersFromAppStore();
    const smoothing = useGetLiveDataSmoothingFromAppStore();
    const colors = useGetProviderColorDictionaryFromAppStore();
    const sidechainsIncluded = useGetSidechainsIncludedFromAppStore();
    const mode = useGetLiveDataModeFromAppStore();
    const liveData = useGetLiveDataFromAppStore();
    const [data, setData] = useState();
    const [processedData, setProcessedData] = useState();
    useEffect(() => {
        if (liveData) {
            setData(getModeData(liveData, mode));
        }
    }, [mode, liveData, sidechainsIncluded]);
    useEffect(() => {
        if (data && colors) {
            let d_possiblyUndefined = providers
                .map((provider) => createDataPoint(data, provider, provider.color))
                .filter((x) => x !== undefined)
                .map((x) => x);
            if (d_possiblyUndefined !== undefined &&
                d_possiblyUndefined?.length > 0) {
                let total = d_possiblyUndefined
                    .map((x) => x?.value)
                    .reduce((a, b) => a + b);
                setProcessedData({
                    data: d_possiblyUndefined,
                    total,
                    mode: dataTypeToString(mode),
                    sidechainsIncluded,
                });
            }
        }
    }, [mode, smoothing, data, colors]);
    return processedData;
}
