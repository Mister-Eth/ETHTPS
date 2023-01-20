import { store, useAppDispatch, useAppSelector } from "../store";
import { IProviderModel } from '../models/interfaces/IProviderModel';
import { ProviderModel } from "../services/api-gen";
import { addProvider } from "../slices/ProvidersSlice";
import { api } from "../services/DependenciesIOC";
export function useGetProvidersFromAppStore() {
    return useAppSelector((state) => state.providers)
}

export function loadProvidersFromServerAsync() {
    api.getProviders().then((providers) => {
        console.log(providers)
    })
}