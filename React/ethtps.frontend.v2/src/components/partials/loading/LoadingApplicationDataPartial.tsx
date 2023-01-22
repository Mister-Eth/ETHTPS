import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { useLoadingBarUntilDataReady } from "../../../hooks/useLoadingBarUntilDataReady";
import { useGetProvidersTablePartial } from "../../../hooks/useGetProvidersTablePartial";
import { loadProvidersFromServer } from "../../../hooks/providerHooks";
import { setProviders } from "../../../slices/ProvidersSlice";
import { store } from "../../../store";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { ProviderResponseModel } from "../../../services/api-gen/models/ProviderResponseModel";
import { useLoadValuesHook } from "../../../hooks/useLoadValuesHook";
import { api } from "../../../services/DependenciesIOC";
import { setNetworks } from "../../../slices/NetworksSlice";
import { setintervals } from "../../../slices/IntervalsSlice";

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
      (value) => store.dispatch(setintervals(value))
    ),
  ];
  let ready = loadees.every((x) => x);
  if (ready) return <>{children}</>;
  else
    return (
      <>
        <Stack spacing={2} direction="row">
          <CircularProgress variant="indeterminate" />
        </Stack>
        <Typography>Loading...</Typography>
      </>
    );
}
