import { useAppSelector } from '../store'

export const useGetExperimentsFromAppStore = () => {
	return useAppSelector((state) => state.experiments)
}
