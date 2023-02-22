import { IHandler } from 'ethtps.data'
import { IDropdownCallback } from './IDropdownCallback'

export interface IDropdownConfiguration<T> extends IDropdownCallback<T> {
	options: string[]
	hidden?: boolean
	hoverText?: string | JSX.Element
	openOnHover?: boolean
	enabled?: boolean
	selection?: IHandler<T>
	conversionFunction(value: string): T
	uiFormatFunction?: (value: T) => string
}
