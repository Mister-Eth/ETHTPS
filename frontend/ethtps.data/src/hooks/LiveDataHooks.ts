import { setIncludeSidechains, setLiveDataType } from '../slices/LiveDataSlice'
import { websocketActions } from '../slices/WebsocketSubscriptionSlice'
import { DataType } from 'ethtps.api.client'
import { useAppSelector, store } from '../store'

export function useGetLiveDataModeFromAppStore() {
	return useAppSelector((state) => state.liveData.liveDataType)
}

export function useGetLiveDataSmoothingFromAppStore() {
	return useAppSelector((state) => state.liveData.liveDataSmoothing)
}

export function useGetLiveDataFromAppStore() {
	return useAppSelector((state) => state.liveData.data)
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
