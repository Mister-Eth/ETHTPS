import { configureStore } from '@reduxjs/toolkit'
import { providersReducer } from './slices/ProvidersSlice'
import { ApplicationState } from './models/dependencies/ApplicationState'
import { ProviderModel } from './services/api-gen/models/ProviderModel';

const preloadedState = new ApplicationState([new ProviderModel()])

export const store = configureStore({
    reducer: { providersReducer },
    ...
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch