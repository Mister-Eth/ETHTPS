import { ICellClickedEvent } from './ICellClickedEvent'
import { ProviderResponseModel } from 'ethtps.data'

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
