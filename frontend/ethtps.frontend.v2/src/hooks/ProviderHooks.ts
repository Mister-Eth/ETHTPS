import { useAppSelector } from "../store"
import { api } from "../services/DependenciesIOC"
import { useGetSidechainsIncludedFromAppStore } from "./LiveDataHooks"
import { ProviderResponseModel } from "ethtps.api.client"
import { useState, useEffect } from "react"

export function useGetProvidersFromAppStore() {
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  return useAppSelector((state) =>
    state.providers.filter((x) =>
      sidechainsIncluded ? x : x.type !== "Sidechain",
    ),
  )
}

export function loadProvidersFromServer(): Promise<ProviderResponseModel[]> {
  return api.getProviders()
}
