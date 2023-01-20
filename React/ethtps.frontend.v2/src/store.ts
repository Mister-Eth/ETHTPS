import { configureStore } from '@reduxjs/toolkit'
import { providersReducer } from './slices/ProvidersSlice'
import { ApplicationState } from './models/dependencies/ApplicationState'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const preloadedState = new ApplicationState()

export const store = configureStore({
    reducer: {
        providers: providersReducer
    },
    ...
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector