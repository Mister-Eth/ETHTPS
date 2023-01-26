import { useAppSelector } from "../store"

export function useGetLiveDataModeFromAppStore() {
  return useAppSelector((state) => state.liveData.liveDataType)
}

export function useGetLiveDataSmoothingFromAppStore() {
  return useAppSelector((state) => state.liveData.liveDataSmoothing)
}
