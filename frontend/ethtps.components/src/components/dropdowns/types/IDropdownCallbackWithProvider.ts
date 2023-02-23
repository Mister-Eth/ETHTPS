import { ProviderModel } from 'ethtps.data'
import { IDropdownCallback } from './IDropdownCallback'

export interface IDropdownCallbackWithProvider<T> extends IDropdownCallback<T> {
	provider?: ProviderModel | string
}
