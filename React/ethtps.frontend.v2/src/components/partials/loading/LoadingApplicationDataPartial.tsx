import React, { PropsWithChildren } from "react";
import { setProviders } from "../../../slices/ProvidersSlice";
import { store } from "../../../store";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useLoadValuesHook } from "../../../hooks/useLoadValuesHook";
import { api } from "../../../services/DependenciesIOC";
import { setNetworks } from "../../../slices/NetworksSlice";
import { setIntervals } from "../../../slices/IntervalsSlice";
import { useState } from "react";
import { useEffect } from "react";
import {
  setMaxGPSData,
  setMaxGTPSData,
  setMaxTPSData,
} from "../../../slices/DataSlice";

export function LoadingApplicationDataPartial({
  children,
  ...props
}: PropsWithChildren): JSX.Element {
  let loadees = [
    useLoadValuesHook(
      () => api.getProviders(),
      (value) => store.dispatch(setProviders(value))
    ),
    useLoadValuesHook(
      () => api.getNetworks(),
      (value) => store.dispatch(setNetworks(value))
    ),
    useLoadValuesHook(
      () => api.getIntervals(),
      (value) => store.dispatch(setIntervals(value))
    ),
    useLoadValuesHook(
      () => api.getMax("TPS"),
      (value) => store.dispatch(setMaxTPSData(value))
    ),
    useLoadValuesHook(
      () => api.getMax("GPS"),
      (value) => store.dispatch(setMaxGPSData(value))
    ),
    useLoadValuesHook(
      () => api.getMax("GTPS"),
      (value) => store.dispatch(setMaxGTPSData(value))
    ),
  ];
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  useEffect(() => {
    setLoadedPercentage(
      (loadees.filter((x) => x).length * 100) / loadees.length
    );
  }, [loadedPercentage]);
  if (loadees.every((x) => x)) return <>{children}</>;
  else
    return (
      <>
        <Stack spacing={2} direction="row">
          <CircularProgress variant="determinate" value={loadedPercentage} />
        </Stack>
        <Typography>Loading... {loadedPercentage}%</Typography>
      </>
    );
}
