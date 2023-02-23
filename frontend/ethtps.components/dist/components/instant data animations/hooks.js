import { extractData, useAppSelector, getModeData, dataTypeToString, } from 'ethtps.data';
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data';
import { liveDataHooks } from 'ethtps.data';
import { useGetProvidersFromAppStore, useGetLiveDataFromAppStore, } from 'ethtps.data';
import { useState, useEffect } from 'react';
export var createDataPoint = function (data, provider, color) {
    var value = extractData(data, provider.name);
    return {
        providerName: provider.name,
        providerColor: color,
        value: value,
    };
};
export function useGet1mTPS() {
    return useAppSelector(function (state) { return state.liveData.oneMinuteTPSData; });
}
export function useGet1mGPS() {
    return useAppSelector(function (state) { return state.liveData.oneMinuteGPSData; });
}
export function useGet1mGTPS() {
    return useAppSelector(function (state) { return state.liveData.oneMinuteGTPSData; });
}
export function useLiveDataState() {
    var smoothing = liveDataHooks.useGetLiveDataSmoothingFromAppStore();
    var sidechainsIncluded = liveDataHooks.useGetSidechainsIncludedFromAppStore();
    var mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    return { smoothing: smoothing, sidechainsIncluded: sidechainsIncluded, mode: mode };
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
    var providers = useGetProvidersFromAppStore();
    var smoothing = liveDataHooks.useGetLiveDataSmoothingFromAppStore();
    var colors = useGetProviderColorDictionaryFromAppStore();
    var sidechainsIncluded = liveDataHooks.useGetSidechainsIncludedFromAppStore();
    var mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    var liveData = useGetLiveDataFromAppStore();
    var _a = useState(), data = _a[0], setData = _a[1];
    var _b = useState(), processedData = _b[0], setProcessedData = _b[1];
    useEffect(function () {
        if (liveData) {
            setData(getModeData(liveData, mode));
        }
    }, [mode, liveData, sidechainsIncluded]);
    useEffect(function () {
        if (data && colors) {
            var d_possiblyUndefined = providers
                .map(function (provider) {
                return createDataPoint(data, provider, provider.color);
            })
                .filter(function (x) { return x !== undefined; })
                .map(function (x) { return x; });
            if (d_possiblyUndefined !== undefined &&
                (d_possiblyUndefined === null || d_possiblyUndefined === void 0 ? void 0 : d_possiblyUndefined.length) > 0) {
                var total = d_possiblyUndefined
                    .map(function (x) { return x === null || x === void 0 ? void 0 : x.value; })
                    .reduce(function (a, b) { return a + b; });
                setProcessedData({
                    data: d_possiblyUndefined,
                    total: total,
                    mode: dataTypeToString(mode),
                    sidechainsIncluded: sidechainsIncluded,
                });
            }
        }
    }, [mode, smoothing, data, colors]);
    return processedData;
}
//# sourceMappingURL=hooks.js.map