import { PropsWithChildren } from "react"
import { setProviders } from "../../../slices/ProvidersSlice"
import { store } from "../../../store"
import { LinearProgress, Stack, Typography } from "@mui/material"
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

export function LoadingApplicationDataPartial({
  children,
  ...props
}: PropsWithChildren): JSX.Element {
  let loadees = [
    useLoadValuesHook(
      () => api.getProviders(),
      (value) => store.dispatch(setProviders(value)),
    ),
    useLoadValuesHook(
      () => api.getNetworks(),
      (value) => store.dispatch(setNetworks(value)),
    ),
    useLoadValuesHook(
      () => api.getIntervals(),
      (value) => store.dispatch(setIntervals(value)),
    ),
    useLoadValuesHook(
      () => api.getMax(DataType.TPS),
      (value) => store.dispatch(setMaxTPSData(value)),
    ),
    useLoadValuesHook(
      () => api.getMax(DataType.GPS),
      (value) => store.dispatch(setMaxGPSData(value)),
    ),
    useLoadValuesHook(
      () => api.getMax(DataType.GTPS),
      (value) => store.dispatch(setMaxGTPSData(value)),
    ),
    useLoadValuesHook(
      () => api.getProviderColorDictionary(),
      (value) => store.dispatch(setProviderColorDictionary(value)),
    ),
    useLoadValuesHook(
      () => api.getProviderTypeColorDictionary(),
      (value) => store.dispatch(setProviderTypeColorDictionary(value)),
    ),
  ]
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
