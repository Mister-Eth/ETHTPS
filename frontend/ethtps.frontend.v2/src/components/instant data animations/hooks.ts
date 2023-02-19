import { useState, useEffect } from "react"
import { extractData, getModeData } from "../../Types"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"
import {
  useGetLiveDataSmoothingFromAppStore,
  useGetLiveDataModeFromAppStore,
  useGetLiveDataFromAppStore,
} from "../../hooks/LiveDataHooks"
import { useGetProvidersFromAppStore } from "../../hooks/ProviderHooks"
import { DataResponseModelDictionary } from "../../Types.dictionaries"
import {
  dataTypeToString,
  toShortString_2,
  TimeInterval,
} from "../../models/TimeIntervals"
import { useGetSidechainsIncludedFromAppStore } from "../../hooks/LiveDataHooks"
import { ProviderResponseModel, TimeIntervalFromJSON } from "ethtps.api.client"
import { useAppSelector } from "../../store"
import { useQuery } from "react-query"
import { api } from "../../services/DependenciesIOC"

export type InstantBarChartDataset = {
  label: string
  data: [number]
  borderColor: string
  backgroundColor: string
}

export type InstantBarChartData = {
  labels: [string]
  datasets: InstantBarChartDataset[]
}

export type LiveDataPoint = {
  providerName: string
  providerColor: string
  value: number
}

export type LiveData = {
  mode: string
  total: number
  data: LiveDataPoint[]
  sidechainsIncluded: boolean
}

export const createDataPoint = (
  data: DataResponseModelDictionary,
  provider: ProviderResponseModel,
  color: string,
) => {
  let value = extractData(data, provider.name as string)
  return {
    providerName: provider.name,
    providerColor: color,
    value,
  } as LiveDataPoint
}

export function useGet1mTPS() {
  return useAppSelector((state) => state.liveData.oneMinuteTPSData)
}

export function useGet1mGPS() {
  return useAppSelector((state) => state.liveData.oneMinuteGPSData)
}

export function useGet1mGTPS() {
  return useAppSelector((state) => state.liveData.oneMinuteGTPSData)
}

export function useLiveDataState() {
  const smoothing = useGetLiveDataSmoothingFromAppStore()
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const mode = useGetLiveDataModeFromAppStore()
  return { smoothing, sidechainsIncluded, mode }
}

export function useStreamchartData(interval: string) {
  /*
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const { data, status, refetch } = useQuery("get streamchart data", () =>
    api.getStreamChartData({
      interval: TimeIntervalFromJSON(`"${interval}"`),
      includeSidechains: sidechainsIncluded,
    }),
  )
  useEffect(() => {
    refetch()
  }, [sidechainsIncluded])*/
  //return { data, status }
}

export function useLiveData() {
  const providers = useGetProvidersFromAppStore()
  const smoothing = useGetLiveDataSmoothingFromAppStore()
  const colors = useGetProviderColorDictionaryFromAppStore()
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  const [data, setData] = useState<DataResponseModelDictionary>()
  const [processedData, setProcessedData] = useState<LiveData>()
  useEffect(() => {
    if (liveData) {
      setData(getModeData(liveData, mode))
    }
  }, [mode, liveData, sidechainsIncluded])
  useEffect(() => {
    if (data && colors) {
      let d_possiblyUndefined = providers
        .map((provider) =>
          createDataPoint(data, provider, provider.color as string),
        )
        .filter((x) => x !== undefined)
        .map((x) => x as LiveDataPoint)
      if (
        d_possiblyUndefined !== undefined &&
        d_possiblyUndefined?.length > 0
      ) {
        let total = d_possiblyUndefined
          .map((x) => x?.value)
          .reduce((a, b) => (a as number) + (b as number))
        setProcessedData({
          data: d_possiblyUndefined,
          total,
          mode: dataTypeToString(mode),
          sidechainsIncluded,
        })
      }
    }
  }, [mode, smoothing, data, colors])
  return processedData
}
