import { ProviderModel } from 'ethtps.api.client'
import { IDropdownCallback } from './IDropdownCallback'
export interface IDropdownCallbackWithProvider<T> extends IDropdownCallback<T> {
	provider: ProviderModel | string
}
