import { useState, useEffect } from 'react'
import { ProviderResponseModel } from 'ethtps.api.client'
import {
	useAppSelector,
	providerHooks,
	liveDataHooks,
	colorHooks,
	dataTypeToString,
	DataResponseModelDictionary,
	extractData,
	getModeData,
} from 'ethtps.data'
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
	color: string
) => {
	let value = extractData(data, provider.name as string)
	return {
		providerName: provider.name,
		providerColor: color,
		value,
	} as LiveDataPoint
}

export function useGet1mTPS() {
	return useAppSelector((state) => state.liveData?.oneMinuteTPSData)
}

export function useGet1mGPS() {
	return useAppSelector((state) => state.liveData?.oneMinuteGPSData)
}

export function useGet1mGTPS() {
	return useAppSelector((state) => state.liveData?.oneMinuteGTPSData)
}

export function useLiveDataState() {
	const smoothing = liveDataHooks.useGetLiveDataSmoothingFromAppStore()
	const sidechainsIncluded = false //useAppSelector(
	//  (state) => state.pages.mainPage.sidechainsIncluded,
	//)
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	return { smoothing, sidechainsIncluded, mode }
}

export function useStreamchartData(interval: string) {
	/*
  const sidechainsIncluded = useAppSelector((state) => state.mainPage?.sidechainsIncluded)
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
	const providers = providerHooks.useGetProvidersFromAppStore()
	const smoothing = liveDataHooks.useGetLiveDataSmoothingFromAppStore()
	const colors = colorHooks.useGetProviderColorDictionaryFromAppStore()
	const [sidechainsIncluded, setSidechainsIncluded] = useState<boolean>(false)
	const v = liveDataHooks.useGetSidechainsIncludedFromAppStore()
	if (v) {
		setSidechainsIncluded(v)
	}
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	const liveData = liveDataHooks.useGetLiveDataFromAppStore()
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
					createDataPoint(data, provider, provider.color as string)
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
					sidechainsIncluded,
					mode: dataTypeToString(mode),
				})
				/*setProcessedData({
          data: d_possiblyUndefined,
          total,
          mode: dataTypeToString(mode)
        })*/
			}
		}
	}, [mode, smoothing, data, colors])
	return processedData
}
