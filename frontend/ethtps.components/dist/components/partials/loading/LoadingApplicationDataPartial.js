import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { DataType } from 'ethtps.api.client';
import { setApplicationDataLoaded } from 'ethtps.data/dist/slices/ApplicationStateSlice';
import { setProviderColorDictionary, setProviderTypeColorDictionary, } from 'ethtps.data/dist/slices/ColorSlice';
import { setMaxTPSData, setMaxGPSData, setMaxGTPSData, } from 'ethtps.data/dist/slices/DataSlice';
import { setIntervals } from 'ethtps.data/dist/slices/IntervalsSlice';
import { setLastMinuteData } from 'ethtps.data/dist/slices/LiveDataSlice';
import { setNetworks } from 'ethtps.data/dist/slices/NetworksSlice';
import { setProviders } from 'ethtps.data/dist/slices/ProvidersSlice';
import { websocketActions } from 'ethtps.data/dist/slices/WebsocketSubscriptionSlice';
import { useState, useEffect } from 'react';
import { store } from 'ethtps.data';
import { useLoadValueHooks as loadHooks } from 'ethtps.data';
export function LoadingApplicationDataPartial({ children, ...props }) {
    const defaultRefetch = 4000;
    const neverUpdates = 99999999999999;
    const rarelyUpdates = 60000;
    const frequentlyUpdates = 30000;
    const almostLive = 4000;
    const [loaded, setLoaded] = useState([
        loadHooks.useLoadValuesHook('providers', () => api.getProviders(), (value) => store.dispatch(setProviders(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('networks', () => api.getNetworks(), (value) => store.dispatch(setNetworks(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('intervals', () => api.getIntervals(), (value) => store.dispatch(setIntervals(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('maxTPS', () => api.getMax(DataType.Tps), (value) => store.dispatch(setMaxTPSData(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('maxGPS', () => api.getMax(DataType.Gps), (value) => store.dispatch(setMaxGPSData(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('maxGTPS', () => api.getMax(DataType.GasAdjustedTps), (value) => store.dispatch(setMaxGTPSData(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('getProviderColorDictionary', () => api.getProviderColorDictionary(), (value) => store.dispatch(setProviderColorDictionary(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('getProviderTypeColorDictionary', () => api.getProviderTypeColorDictionary(), (value) => store.dispatch(setProviderTypeColorDictionary(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('getLastMinuteTPSData', () => api.getLastMinuteData(DataType.Tps), (value) => store.dispatch(setLastMinuteData(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('getLastMinuteGPSData', () => api.getLastMinuteData(DataType.Gps), (value) => store.dispatch(setLastMinuteData(value)), neverUpdates, neverUpdates),
        loadHooks.useLoadValuesHook('getLastMinuteGTPSData', () => api.getLastMinuteData(DataType.GasAdjustedTps), (value) => store.dispatch(setLastMinuteData(value)), neverUpdates, neverUpdates),
    ]);
    useEffect(() => {
        let x = loaded.every((y) => y !== undefined);
        if (x) {
            store.dispatch(setApplicationDataLoaded(true));
            store.dispatch(websocketActions.connecting());
        }
    }, loaded);
    //useUpdateLiveData(almostLive)
    return _jsx(_Fragment, { children: children });
    /*
  if (loadees.every((x) => x)) return <>{children}</>
  else
    return (
      <>
        <div className="center">
          <Stack spacing={2} direction="row">
            <LinearProgress variant="indeterminate" style={{ width: "100%" }} />
          </Stack>
          <Typography>Loading...</Typography>
        </div>
      </>
    )*/
}
