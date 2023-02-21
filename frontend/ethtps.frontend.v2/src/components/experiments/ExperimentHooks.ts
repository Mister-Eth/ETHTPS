import { store, useAppSelector } from "ethtps.data"
import { api } from "../../services/DependenciesIOC"
export const loadAvailableExperiments = (deviceType: string) => {
  return api.getAvailableExperiments(deviceType)
}

export const useGetExperimentsFromAppStore = () => {
  return useAppSelector((state) => state.experiments)
}
