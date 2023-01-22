import { store, useAppDispatch, useAppSelector } from "../store";
import { IProviderModel } from "../models/interfaces/IProviderModel";
import { ProviderModel, ProviderResponseModel } from "../services/api-gen";
import { addProvider } from "../slices/ProvidersSlice";
import { api } from "../services/DependenciesIOC";

export function useGetProvidersFromAppStore() {
  return useAppSelector((state) => state.providers);
}

export function loadProvidersFromServer(): Promise<ProviderResponseModel[]> {
  return api.getProviders();
}
