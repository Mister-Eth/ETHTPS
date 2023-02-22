import { IOptionalCallback } from './IOptionalCallback'
import { IOptionalDefault } from './IOptionalDefault'

export interface IHandler<T>
	extends IOptionalCallback<T>,
		IOptionalDefault<T> {}
