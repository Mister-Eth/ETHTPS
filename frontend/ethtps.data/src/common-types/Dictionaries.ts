import { DataPoint, DataResponseModel } from 'ethtps.api.client'

export type GenericDictionary<T> = { [key: string]: T }
export type DataPointDictionary = GenericDictionary<DataPoint>
export type DataResponseModelDictionary = GenericDictionary<DataResponseModel[]>
export type InstantDataResponseModel =
	GenericDictionary<DataResponseModelDictionary>
export type StringDictionary = GenericDictionary<string>
export type AnyDictionary = GenericDictionary<any>
