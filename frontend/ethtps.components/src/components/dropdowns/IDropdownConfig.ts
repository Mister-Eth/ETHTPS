import { IDropdownCallback } from './IDropdownCallback'
export interface IDropdownConfig<T> extends IDropdownCallback<T> {
	hidden?: boolean
}
