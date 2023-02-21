import {
	InstantDataResponseModel,
	DataResponseModelDictionary,
} from '../../common-types/Dictionaries'
import { DataType, TimeInterval } from 'ethtps.api.client'

export interface ILiveDataModeModel {
	liveDataSmoothing: TimeInterval
	liveDataType: DataType
	includeSidechains: boolean
	data?: InstantDataResponseModel
	oneMinuteTPSData?: DataResponseModelDictionary
	oneMinuteGPSData?: DataResponseModelDictionary
	oneMinuteGTPSData?: DataResponseModelDictionary
	currentVisitors?: number
}
