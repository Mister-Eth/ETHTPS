import { DataType } from 'ethtps.api.client'
import { useAppSelector } from '../store'

export function useGetMaxDataFromAppStore() {
	return useAppSelector((state) => state.maxData)
}

export function useGetMaxDataForProviderFromAppStore(
	provider: string,
	type: DataType
) {
	return useAppSelector((state) =>
		state.maxData.getMaxDataFor(provider, type)
	)
}

export function useGetMaxTPSDataFromAppStore() {
	return useAppSelector((state) => state.maxData).maxTPSData
}

export function useGetMaxGPSDataFromAppStore() {
	return useAppSelector((state) => state.maxData).maxGPSData
}

export function useGetMaxGTPSDataFromAppStore() {
	return useAppSelector((state) => state.maxData).maxGTPSData
}

export function useGetNetworksFromAppStore() {
	return useAppSelector((state) => state.networks)
}
