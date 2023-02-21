import { useGetSidechainsIncludedFromAppStore } from './LiveDataHooks'
import { useAppSelector } from '../store'

export function useGetProvidersFromAppStore() {
	const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
	return useAppSelector((state) =>
		state.providers.filter((x) =>
			sidechainsIncluded ? x : x.type !== 'Sidechain'
		)
	)
}
