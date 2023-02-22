import { IOptionalCallback } from 'ethtps.data'

export interface IDropdownCallback<T> {
	changed?: IOptionalCallback<T>
}
