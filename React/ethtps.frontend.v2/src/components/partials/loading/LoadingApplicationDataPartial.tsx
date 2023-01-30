import { PropsWithChildren, useEffect } from "react"
import { setProviders } from "../../../slices/ProvidersSlice"
import { store, useAppSelector } from "../../../store"
import { useLoadValuesHook } from "../../../hooks/useLoadValuesHook"
import { api } from "../../../services/DependenciesIOC"
import { setNetworks } from "../../../slices/NetworksSlice"
import { setIntervals } from "../../../slices/IntervalsSlice"
import {
  setMaxGPSData,
  setMaxGTPSData,
  setMaxTPSData,
} from "../../../slices/DataSlice"
import { DataType } from "../../../Types"
import {
  setProviderColorDictionary,
  setProviderTypeColorDictionary,
} from "../../../slices/ColorSlice"
import { useUpdateLiveData } from "../../../hooks/LiveDataHooks"
import { useState } from "react"
import { setApplicationDataLoaded } from "../../../slices/ApplicationStateSlice"

export function LoadingApplicationDataPartial({
  children,
  ...props
}: PropsWithChildren): JSX.Element {
  const defaultRefetch = 4000
  const rarelyUpdates = 60000
  const frequentlyUpdates = 30000
  const almostLive = 4000
  const [loaded, setLoaded] = useState([
    useLoadValuesHook(
      "providers",
      () => api.getProviders(),
      (value) => store.dispatch(setProviders(value)),
      rarelyUpdates,
      rarelyUpdates,
    ),
    useLoadValuesHook(
      "networks",
      () => api.getNetworks(),
      (value) => store.dispatch(setNetworks(value)),
      rarelyUpdates,
      rarelyUpdates,
    ),
    useLoadValuesHook(
      "intervals",
      () => api.getIntervals(),
      (value) => store.dispatch(setIntervals(value)),
      rarelyUpdates,
      rarelyUpdates,
    ),
    useLoadValuesHook(
      "maxTPS",
      () => api.getMax(DataType.TPS),
      (value) => store.dispatch(setMaxTPSData(value)),
      frequentlyUpdates,
      frequentlyUpdates,
    ),
    useLoadValuesHook(
      "maxGPS",
      () => api.getMax(DataType.GPS),
      (value) => store.dispatch(setMaxGPSData(value)),
      frequentlyUpdates,
      frequentlyUpdates,
    ),
    useLoadValuesHook(
      "maxGTPS",
      () => api.getMax(DataType.GTPS),
      (value) => store.dispatch(setMaxGTPSData(value)),
      frequentlyUpdates,
      frequentlyUpdates,
    ),
    useLoadValuesHook(
      "getProviderColorDictionary",
      () => api.getProviderColorDictionary(),
      (value) => store.dispatch(setProviderColorDictionary(value)),
      rarelyUpdates,
      rarelyUpdates,
    ),
    useLoadValuesHook(
      "getProviderTypeColorDictionary",
      () => api.getProviderTypeColorDictionary(),
      (value) => store.dispatch(setProviderTypeColorDictionary(value)),
      rarelyUpdates,
      rarelyUpdates,
    ),
  ])
  useEffect(() => {
    let x = loaded.every((y) => y !== undefined)
    if (x) {
      store.dispatch(setApplicationDataLoaded(true))
    }
  }, loaded)
  useUpdateLiveData(almostLive)
  return <>{children}</>
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
