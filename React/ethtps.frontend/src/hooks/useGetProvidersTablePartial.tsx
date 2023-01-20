import React from 'react'
import { ProviderTablePartial } from '../partials/ProviderTablePartial';
import { useLoadingBarUntilDataReady } from "./useLoadingBarUntilDataReady";
import { ApplicationState } from "../../models/dependencies/ApplicationState";
import { useSelector } from 'react-redux';

export function useGetProvidersTablePartial(): JSX.Element {
    //let providers = useQuery('test', () => generalApi?.aPIV2ProvidersGet())
    const providers = useSelector((state: ApplicationState) => state.providers)
    return useLoadingBarUntilDataReady('Loading providers...', <ProviderTablePartial providers={providers} />, providers);
}