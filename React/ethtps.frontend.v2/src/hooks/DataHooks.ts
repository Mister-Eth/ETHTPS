import { useAppSelector } from "../store"

export function useGetMaxDataFromAppStore() {
  return useAppSelector((state) => state.data)
}

export function useGetMaxTPSDataFromAppStore() {
  return useAppSelector((state) => state.data).maxTPSData
}

export function useGetMaxGPSDataFromAppStore() {
  return useAppSelector((state) => state.data).maxGPSData
}

export function useGetMaxGTPSDataFromAppStore() {
  return useAppSelector((state) => state.data).maxGTPSData
}
