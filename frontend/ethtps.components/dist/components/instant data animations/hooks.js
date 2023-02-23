"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLiveData = exports.useStreamchartData = exports.useLiveDataState = exports.useGet1mGTPS = exports.useGet1mGPS = exports.useGet1mTPS = exports.createDataPoint = void 0;
const ethtps_data_1 = require("ethtps.data");
const ethtps_data_2 = require("ethtps.data");
const LiveDataHooks_1 = require("ethtps.data/dist/hooks/LiveDataHooks");
const ethtps_data_3 = require("ethtps.data");
const react_1 = require("react");
const createDataPoint = (data, provider, color) => {
    let value = (0, ethtps_data_1.extractData)(data, provider.name);
    return {
        providerName: provider.name,
        providerColor: color,
        value,
    };
};
exports.createDataPoint = createDataPoint;
function useGet1mTPS() {
    return (0, ethtps_data_1.useAppSelector)((state) => state.liveData.oneMinuteTPSData);
}
exports.useGet1mTPS = useGet1mTPS;
function useGet1mGPS() {
    return (0, ethtps_data_1.useAppSelector)((state) => state.liveData.oneMinuteGPSData);
}
exports.useGet1mGPS = useGet1mGPS;
function useGet1mGTPS() {
    return (0, ethtps_data_1.useAppSelector)((state) => state.liveData.oneMinuteGTPSData);
}
exports.useGet1mGTPS = useGet1mGTPS;
function useLiveDataState() {
    const smoothing = (0, LiveDataHooks_1.useGetLiveDataSmoothingFromAppStore)();
    const sidechainsIncluded = (0, LiveDataHooks_1.useGetSidechainsIncludedFromAppStore)();
    const mode = (0, LiveDataHooks_1.useGetLiveDataModeFromAppStore)();
    return { smoothing, sidechainsIncluded, mode };
}
exports.useLiveDataState = useLiveDataState;
function useStreamchartData(interval) {
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
exports.useStreamchartData = useStreamchartData;
function useLiveData() {
    const providers = (0, ethtps_data_3.useGetProvidersFromAppStore)();
    const smoothing = (0, LiveDataHooks_1.useGetLiveDataSmoothingFromAppStore)();
    const colors = (0, ethtps_data_2.useGetProviderColorDictionaryFromAppStore)();
    const sidechainsIncluded = (0, LiveDataHooks_1.useGetSidechainsIncludedFromAppStore)();
    const mode = (0, LiveDataHooks_1.useGetLiveDataModeFromAppStore)();
    const liveData = (0, LiveDataHooks_1.useGetLiveDataFromAppStore)();
    const [data, setData] = (0, react_1.useState)();
    const [processedData, setProcessedData] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (liveData) {
            setData((0, ethtps_data_1.getModeData)(liveData, mode));
        }
    }, [mode, liveData, sidechainsIncluded]);
    (0, react_1.useEffect)(() => {
        if (data && colors) {
            let d_possiblyUndefined = providers
                .map((provider) => (0, exports.createDataPoint)(data, provider, provider.color))
                .filter((x) => x !== undefined)
                .map((x) => x);
            if (d_possiblyUndefined !== undefined &&
                (d_possiblyUndefined === null || d_possiblyUndefined === void 0 ? void 0 : d_possiblyUndefined.length) > 0) {
                let total = d_possiblyUndefined
                    .map((x) => x === null || x === void 0 ? void 0 : x.value)
                    .reduce((a, b) => a + b);
                setProcessedData({
                    data: d_possiblyUndefined,
                    total,
                    mode: (0, ethtps_data_1.dataTypeToString)(mode),
                    sidechainsIncluded,
                });
            }
        }
    }, [mode, smoothing, data, colors]);
    return processedData;
}
exports.useLiveData = useLiveData;
