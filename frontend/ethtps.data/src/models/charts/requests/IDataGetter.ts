export interface IDataGetter<TRequest, TResponse> {
	dataGetter: (request: TRequest) => Promise<TResponse>
}
