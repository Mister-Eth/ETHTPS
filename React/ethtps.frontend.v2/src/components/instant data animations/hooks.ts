import { useState, useEffect } from "react"
import { extractData, getModeData } from "../../Types"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"
import {
  useGetLiveDataSmoothingFromAppStore,
  useGetLiveDataModeFromAppStore,
  useGetLiveDataFromAppStore,
} from "../../hooks/LiveDataHooks"
import { useGetProvidersFromAppStore } from "../../hooks/ProviderHooks"
import { ProviderModel } from "../../services/api-gen/models/ProviderModel"
import { DataResponseModelDictionary } from "../../Types.dictionaries"
import { dataTypeToString, toShortString_2 } from "../../models/TimeIntervals"

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
}

export const createDataPoint = (
  data: DataResponseModelDictionary,
  provider: ProviderModel,
  color: string,
) => {
  let value = extractData(data, provider.name)
  if (value === 0) return undefined
  return {
    providerName: provider.name,
    providerColor: color,
    value,
  } as LiveDataPoint
}

export function useLiveData() {
  const providers = useGetProvidersFromAppStore()
  const smoothing = useGetLiveDataSmoothingFromAppStore()
  const colors = useGetProviderColorDictionaryFromAppStore()

  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  const [data, setData] = useState(getModeData(liveData, mode))

  const [processedData, setProcessedData] = useState<LiveData>()
  useEffect(() => {
    setData(getModeData(liveData, mode))
  }, [mode, liveData])
  useEffect(() => {
    if (data && colors) {
      let d_possiblyUndefined = providers
        .map((provider) => createDataPoint(data, provider, colors))
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
        })
      }
    }
  }, [mode, smoothing, data, colors])
  return processedData
}
