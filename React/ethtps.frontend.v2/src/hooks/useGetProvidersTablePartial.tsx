import React from 'react'
import { useLoadingBarUntilDataReady } from "./useLoadingBarUntilDataReady";
import { ProviderTablePartial } from '../components/partials/ProviderTablePartial';
import { ApplicationState } from '../models/dependencies/ApplicationState';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import { useState } from 'react';
import { useEffect } from 'react';
import { addProvider } from '../slices/ProvidersSlice';
import { ProviderModel } from '../services/api-gen/models/ProviderModel';

export function useGetProvidersTablePartial(): JSX.Element {
    //let providers = useQuery('test', () => generalApi?.aPIV2ProvidersGet())
    const dispatch = useDispatch()
    const providers = useSelector((state: ApplicationState) => state.providers);
    useEffect(() => {
        setTimeout(() => {
            dispatch(addProvider({
                name: 'test',
                type: 'none'
            }))
        }, 1000);
    }, [])
    return useLoadingBarUntilDataReady('Loading providers...', <ProviderTablePartial providers={providers} />, providers);
}