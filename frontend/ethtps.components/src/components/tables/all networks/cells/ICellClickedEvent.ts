import { ProviderModel } from 'ethtps.data'

export interface ICellClickedEvent {
	clickCallback?: (provider?: ProviderModel, cellName?: string) => void
}
