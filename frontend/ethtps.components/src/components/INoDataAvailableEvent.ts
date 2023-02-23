import { ProviderModel } from 'ethtps.data'

export interface INoDataAvailableEvent {
	onNoDataAvailable?: (provider: ProviderModel | string) => void
}
