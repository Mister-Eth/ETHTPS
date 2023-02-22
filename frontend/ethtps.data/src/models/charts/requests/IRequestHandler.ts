import { IDataGetter } from './IDataGetter'

export interface IRequestHandler<TRequest, TResponse>
	extends IDataGetter<TRequest, TResponse> {
	refetchFunction: () => void
	fetchInfo: {
		isFetching: boolean
		isSuccess: boolean
	}
}
