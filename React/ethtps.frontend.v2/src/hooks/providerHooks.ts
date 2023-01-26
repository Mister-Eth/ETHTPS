import { useAppSelector } from "../store"
import { ProviderResponseModel } from "../services/api-gen"
import { api } from "../services/DependenciesIOC"

export function useGetProvidersFromAppStore() {
  return useAppSelector((state) => state.providers)
}

export function loadProvidersFromServer(): Promise<ProviderResponseModel[]> {
  return api.getProviders()
}
