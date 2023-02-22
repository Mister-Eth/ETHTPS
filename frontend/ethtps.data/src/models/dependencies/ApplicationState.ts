import { IMaxDataModel } from '../interfaces/IMaxDataModel'
import { IDataModeModel } from '../interfaces/IDataModeModel'
import { ILiveDataModeModel } from '../interfaces/ILiveDataModeModel'
import { ProviderResponseModel } from 'ethtps.api.client'
import { IColorDictionaries } from '../interfaces/IColorDictionaries'
import { IDataLoadingModel } from '../interfaces/IDataLoadingModel'
import { IMainPageModel } from '../interfaces/IMainPageModel'
import { IPagesState } from '../IPagesState'
import { WebsocketSubscriptionState } from '../../slices/WebsocketSubscriptionSlice'

export interface IApplicationState {
	websockets?: WebsocketSubscriptionState
	colorDictionaries?: IColorDictionaries
	dataLoading?: IDataLoadingModel
	dataMode?: IDataModeModel
	liveData?: ILiveDataModeModel
	mainPage?: IMainPageModel
	maxData?: IMaxDataModel
	experiments?: number[]
	intervals?: Array<string>
	networks?: Array<string>
	providers?: ProviderResponseModel[]
	pages: IPagesState
}

export class ApplicationState implements IApplicationState {
	constructor(
		public websockets?: WebsocketSubscriptionState,
		public colorDictionaries?: IColorDictionaries,
		public dataLoading?: IDataLoadingModel,
		public dataMode?: IDataModeModel,
		public liveData?: ILiveDataModeModel,
		public mainPage?: IMainPageModel,
		public maxData?: IMaxDataModel,
		public experiments?: number[],
		public intervals?: Array<string>,
		public networks?: Array<string>,
		public providers?: ProviderResponseModel[],
		public pages: {
			mainPage: IMainPageModel
		} = {
			mainPage: {
				sidechainsIncluded: false,
			},
		}
	) {}
}
