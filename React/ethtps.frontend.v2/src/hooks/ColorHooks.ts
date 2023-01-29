import { useAppSelector } from "../store"
import {
  useGetNetworksFromAppStore,
  useGetMaxTPSDataFromAppStore,
  useGetMaxGPSDataFromAppStore,
  useGetMaxGTPSDataFromAppStore,
} from "./DataHooks"
import { useGetIntervalsFromAppStore } from "./IntervalHooks"
import { useGetProvidersFromAppStore } from "./ProviderHooks"
import { useState, useEffect } from "react"

export function useGetProviderColorDictionaryFromAppStore() {
  return useAppSelector((state) => state.colors.providerColorDictionary)
}

export function useGetProviderTypeColorDictionaryFromAppStore() {
  return useAppSelector((state) => state.colors.providerTypesColorDictionary)
}

export type Loadee = {
  name: string
  completed: boolean
}

export type DataLoadProgress = {
  loadees: Loadee[]
}

export function useGetDataLoadProgress() {
  const providers = useGetProvidersFromAppStore()
  const networks = useGetNetworksFromAppStore()
  const intervals = useGetIntervalsFromAppStore()
  const maxTPS = useGetMaxTPSDataFromAppStore()
  const maxGPS = useGetMaxGPSDataFromAppStore()
  const maxGTPS = useGetMaxGTPSDataFromAppStore()
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const typeColorDictionary = useGetProviderTypeColorDictionaryFromAppStore()

  function buildResult() {
    return {
      loadees: [
        {
          name: "Providers",
          completed: providers.length > 0,
        },
        {
          name: "Networks",
          completed: networks.length > 0,
        },
        {
          name: "Intervals",
          completed: intervals.length > 0,
        },
        {
          name: "Max TPS",
          completed: maxTPS !== undefined,
        },
        {
          name: "Max GPS",
          completed: maxGPS !== undefined,
        },
        {
          name: "Max GTPS",
          completed: maxGTPS !== undefined,
        },
        {
          name: "Color dictionary",
          completed: colorDictionary !== undefined,
        },
        {
          name: "Provider type color dictionary",
          completed: typeColorDictionary !== undefined,
        },
      ],
    }
  }
  const [result, setResult] = useState<DataLoadProgress>(buildResult())
  useEffect(() => {
    setResult(buildResult())
  }, [
    providers,
    networks,
    intervals,
    maxTPS,
    maxGPS,
    maxGTPS,
    colorDictionary,
    typeColorDictionary,
  ])
  return result
}
