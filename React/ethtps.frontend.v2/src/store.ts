import { configureStore } from "@reduxjs/toolkit"
import { providersReducer } from "./slices/ProvidersSlice"
import { ApplicationState } from "./models/dependencies/ApplicationState"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { networksReducer } from "./slices/NetworksSlice"
import { intervalsReducer } from "./slices/IntervalsSlice"
import { dataReducer } from "./slices/DataSlice"
import { liveDataReducer } from "./slices/LiveDataSlice"
import { colorReducer } from "./slices/ColorSlice"

const preloadedState = new ApplicationState()

export const store = configureStore({
  reducer: {
    providers: providersReducer,
    networks: networksReducer,
    intervals: intervalsReducer,
    data: dataReducer,
    liveData: liveDataReducer,
    colors: colorReducer,
  },
  ...preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
