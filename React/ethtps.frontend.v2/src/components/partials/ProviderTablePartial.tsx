import React from "react";
import { store } from "../../store";
import {
  useGetProvidersFromAppStore,
  loadProvidersFromServer,
} from "../../hooks/providerHooks";
import { setProviders } from "../../slices/ProvidersSlice";
import { Button } from "../../stories/Button";
import useEffect from "react";

export function ProviderTablePartial() {
  const providers = useGetProvidersFromAppStore();
  return (
    <>
      Provider table with{" "}
      <b>
        {providers?.length === undefined ? "no" : providers?.length} provider
        {providers?.length != 1 ? "s" : ""}{" "}
      </b>
      <br />
    </>
  );
}
