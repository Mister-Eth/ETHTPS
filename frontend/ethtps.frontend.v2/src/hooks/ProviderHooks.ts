import { useAppSelector } from "../store"
import { ProviderResponseModel } from "../services/api-gen"
import { api } from "../services/DependenciesIOC"
import { useGetSidechainsIncludedFromAppStore } from "./LiveDataHooks"

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
