import { store, useAppDispatch, useAppSelector } from "../store";
import { IProviderModel } from '../models/interfaces/IProviderModel';
import { ProviderModel } from "../services/api-gen";
import { addProvider } from "../slices/ProvidersSlice";

export function useGetProvidersFromAppStore() {
    return useAppSelector((state) => state.providers)
}

export function addProviderToAppState(model: IProviderModel) {
    console.log(store.dispatch(addProvider(model)))
}