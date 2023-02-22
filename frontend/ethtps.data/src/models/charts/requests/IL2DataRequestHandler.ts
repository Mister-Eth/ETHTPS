import { IRequestHandler } from './IRequestHandler'
import { L2DataRequestModel, L2DataResponseModel } from 'ethtps.api.client'

export interface IL2DataRequestHandler
	extends IRequestHandler<L2DataRequestModel, L2DataResponseModel> {}
