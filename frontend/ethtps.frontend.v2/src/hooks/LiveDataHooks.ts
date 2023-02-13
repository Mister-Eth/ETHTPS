import { DataType } from "../Types"
import { TimeInterval } from "../models/TimeIntervals"
import { api } from "../services/DependenciesIOC"
import {
  setIncludeSidechains,
  setLiveData,
  setLiveDataType,
} from "../slices/LiveDataSlice"
import { useAppSelector, useAppDispatch, store } from "../store"
import { useLoadValuesHook } from "./useLoadValuesHook"
import { websocketActions } from "../slices/WebsocketSubscriptionSlice"

export function useGetLiveDataModeFromAppStore() {
  return useAppSelector((state) => state.liveData.liveDataType)
}

export function useGetLiveDataSmoothingFromAppStore() {
  return useAppSelector((state) => state.liveData.liveDataSmoothing)
}

export function useGetLiveDataFromAppStore() {
  return useAppSelector((state) => state.liveData)
}

export function useSetDataModeMutation(mode: DataType) {
  store.dispatch(setLiveDataType(mode))
}

export function useUpdateLiveData(updateRateMs: number) {
  store.dispatch(websocketActions.connecting())
}

export function useGetSidechainsIncludedFromAppStore() {
  return useAppSelector((state) => state.liveData.includeSidechains)
}

export function useSetSidechainsIncluded(value: boolean) {
  store.dispatch(setIncludeSidechains(value))
}
