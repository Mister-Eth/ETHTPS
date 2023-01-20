import React from 'react'
import { useLoadingBarUntilDataReady } from "./useLoadingBarUntilDataReady";
import { ProviderTablePartial } from '../components/partials/ProviderTablePartial';
import { ApplicationState } from '../models/dependencies/ApplicationState';

export function useGetProvidersTablePartial(): JSX.Element {
    //let providers = useQuery('test', () => generalApi?.aPIV2ProvidersGet())
    //const providers = useSelector((state: ApplicationState) => state.providers)
    return useLoadingBarUntilDataReady('Loading providers...', <ProviderTablePartial providers={providers} />, providers);
}