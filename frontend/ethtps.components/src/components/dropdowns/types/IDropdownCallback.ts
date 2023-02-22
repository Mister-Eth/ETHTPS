import { IHandler } from 'ethtps.data'

export interface IDropdownCallback<T> {
	changed?: IHandler<T>
}
