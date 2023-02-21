import { ProviderModel } from 'ethtps.api.client'

export interface ICellClickedEvent {
	clickCallback?: (provider?: ProviderModel, cellName?: string) => void
}
