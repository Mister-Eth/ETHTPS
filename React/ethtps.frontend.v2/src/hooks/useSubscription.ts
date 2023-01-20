import { Store } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { store } from '../store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ApplicationState, IApplicationState } from '../models/dependencies/ApplicationState';
/*
export function useStoreSubscription<TReturn, TStore extends ToolkitStore<ApplicationState>>(store: TStore, selectionFunction: (store: (TStore extends ToolkitStore<ApplicationState>)) => TReturn) {
    const [value, setValue] = useState<TReturn>()
    store.subscribe(() => {
        setValue(selectionFunction(store.getState()));
    })
    return [value, setValue]
}

export function useApplicationStoreSubscription<TReturn>(selectionFunction: (store: ToolkitStore<ApplicationState>) => TReturn) {
    return useStoreSubscription<TReturn, ToolkitStore<IApplicationState>>(store, selectionFunction)
}*/