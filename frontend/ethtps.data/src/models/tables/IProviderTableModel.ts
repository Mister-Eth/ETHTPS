import { IMaxDataModel } from '../interfaces/IMaxDataModel'
import { ICellClickedEvent } from './ICellClickedEvent'
import { IMaxRowsModel } from './IMaxRowsModel'
import { ProviderResponseModel } from 'ethtps.api.client'

export interface IProviderTableModel extends ICellClickedEvent, IMaxRowsModel {
	providerData?: ProviderResponseModel[]
	maxData?: IMaxDataModel
	selectedProvider?: string
	providerRowHovered?: (providerName?: string) => void
}
