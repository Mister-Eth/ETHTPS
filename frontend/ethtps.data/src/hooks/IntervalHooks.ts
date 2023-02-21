import { useAppSelector } from '../store'

export function useGetIntervalsFromAppStore() {
	return useAppSelector((state) => state.intervals)
}
