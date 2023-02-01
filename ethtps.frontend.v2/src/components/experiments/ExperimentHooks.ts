import { api } from "../../services/DependenciesIOC"
import { useAppSelector } from "../../store"

export const loadAvailableExperiments = (deviceType: string) => {
  return api.getAvailableExperiments(deviceType)
}

export const useGetExperimentsFromAppStore = () => {
  return useAppSelector((state) => state.experiments)
}
