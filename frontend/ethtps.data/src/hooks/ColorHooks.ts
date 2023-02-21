import { useAppSelector } from '../store'

export function useGetProviderColorDictionaryFromAppStore() {
	return useAppSelector((state) => state.colors.providerColorDictionary)
}

export function useGetProviderTypeColorDictionaryFromAppStore() {
	return useAppSelector((state) => state.colors.providerTypesColorDictionary)
}
