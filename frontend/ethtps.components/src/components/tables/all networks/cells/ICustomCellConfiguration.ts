import { ICellClickedEvent } from './ICellClickedEvent'
import { ProviderResponseModel } from 'ethtps.api.client'

export const buildClassNames = (config: ICustomCellConfiguration) => {
	return {
		className: `inline ${
			config.clickCallback !== undefined ? 'pointable' : ''
		}`,
	}
}

export interface ICustomCellConfiguration extends ICellClickedEvent {
	provider?: ProviderResponseModel
}
