import { ApplicationState } from './models/dependencies/ApplicationState'
import { IGlobalDependencies } from './models/dependencies/IGlobalDependencies'
import { IColorDictionaries } from './models/interfaces/IColorDictionaries'
import { IDataLoadingModel } from './models/interfaces/IDataLoadingModel'
import { ILiveDataModeModel } from './models/interfaces/ILiveDataModeModel'
import { IMainPageModel } from './models/interfaces/IMainPageModel'
import { IMaxDataModel } from './models/interfaces/IMaxDataModel'
import { IObjectWithProvider } from './models/interfaces/IObjectWithProvider'
import { IProviderModel } from './models/interfaces/IProviderModel'
import { IProviderPageModel } from './models/interfaces/IProviderPageModel'
import { IMaxRowsModel } from './models/tables/IMaxRowsModel'
import { IProviderTableModel } from './models/tables/IProviderTableModel'
import * as timeIntervalUtils from './models/TimeIntervals'
import { mainPageReducer } from './slices/page slices/MainPageSlice'
import {
	applicationStateReducer,
	setStoreAPIKey,
} from './slices/ApplicationStateSlice'
import { colorReducer } from './slices/ColorSlice'
import { dataReducer } from './slices/DataSlice'
import { experimentReducer, setExperiments } from './slices/ExperimentSlice'
import { intervalsReducer } from './slices/IntervalsSlice'
import { liveDataReducer } from './slices/LiveDataSlice'
import { networksReducer } from './slices/NetworksSlice'
import { providersReducer } from './slices/ProvidersSlice'
import websocketMiddleware from './slices/WebsocketSubscriptionMiddleware'
import websocketSlice from './slices/WebsocketSubscriptionSlice'
import {
	DataType,
	DataPoint,
	ProviderResponseModel,
	ProviderModel,
	IProviderExternalWebsite,
	DatedXYDataPoint,
	StringXYDataPoint,
	NumericXYDataPoint,
	Dataset,
	L2DataResponseModel,
} from 'ethtps.api.client'
import { store, useAppSelector, useAppDispatch } from './store'
import * as appStateHooks from './hooks/ApplicationStateHooks'
import * as colorHooks from './hooks/ColorHooks'
import * as dataHooks from './hooks/DataHooks'
import * as intervalHooks from './hooks/IntervalHooks'
import * as liveDataHooks from './hooks/LiveDataHooks'
import * as providerHooks from './hooks/ProviderHooks'
import * as queryHooks from './hooks/QueryHooks'
import * as useLoadValueHooks from './hooks/useLoadValuesHook'
import { dataTypeToString, fromShortString_2 } from './models/TimeIntervals'
import {
	useSetSidechainsIncluded,
	useGetLiveDataFromAppStore,
} from './hooks/LiveDataHooks'
import { IPagesState } from './models/IPagesState'
import { useSetStoreAPIKey } from './hooks/ApplicationStateHooks'
import { useGetExperimentsFromAppStore } from './hooks/ExperimentHooks'
import { toShortString_2 } from './models/TimeIntervals'
import {
	toShortString,
	fromShortString,
	extractData,
	getModeData,
	TV,
	TimeValue,
	StringTimeValue,
	appModeToUIFormat,
	inline,
	uniform,
	numberFormat,
	shortTimeIntervalToUIFormat,
} from './common-types/Common'
import {
	InstantDataResponseModel,
	StringDictionary,
	AnyDictionary,
	DataPointDictionary,
	DataResponseModelDictionary,
	GenericDictionary,
} from './common-types/Dictionaries'
import { INetworkChangedHandler } from './models/charts/handlers/l2DataParameterHandlers/INetworkChangedHandler'
import { IL2DataRequestHandler } from './models/charts/requests/IL2DataRequestHandler'
import { IModeChangedHandler } from './models/charts/handlers/l2DataParameterHandlers/IModeChangedHandler'
import { IIntervalChangedHandler } from './models/charts/handlers/l2DataParameterHandlers/IIntervalChangedHandler'
import { IIncludeSidechainsChangedHandler } from './models/charts/handlers/l2DataParameterHandlers/IIncludeSidechainsChangedHandler'
import { IHandler } from './models/charts/handlers/IHandler'
import { IRequestHandler } from './models/charts/requests/IRequestHandler'
import {
	useHandler,
	Handler,
	createHandlerFromCallback,
} from './models/charts/handlers/hooks/HandlerHooks'
import { handleException } from './exceptions/ExceptionHandler'
import { IDataGetter } from './models/charts/requests/IDataGetter'
import { IOptionalCallback } from './models/charts/handlers/IOptionalCallback'
import { IOptionalDefault } from './models/charts/handlers/IOptionalDefault'
import { L2DataRequestModel, TimeInterval } from 'ethtps.api.client'
import { useGetQueryWithAutoRefetch } from './hooks/QueryHooks'
import { useGetProvidersFromAppStore } from './hooks/ProviderHooks'
import {
	useGetSidechainsIncludedFromAppStore,
	useSetDataModeMutation,
} from './hooks/LiveDataHooks'
import {
	useGetProviderColorDictionaryFromAppStore,
	useGetProviderTypeColorDictionaryFromAppStore,
} from './hooks/ColorHooks'
export {
	ApplicationState,
	IGlobalDependencies,
	IColorDictionaries,
	IDataLoadingModel,
	ILiveDataModeModel,
	IMainPageModel,
	IMaxDataModel,
	IObjectWithProvider,
	IProviderModel,
	IProviderPageModel,
	IMaxRowsModel,
	IProviderTableModel,
	IPagesState,
	DataType,
	mainPageReducer,
	applicationStateReducer,
	colorReducer,
	dataReducer,
	experimentReducer,
	intervalsReducer,
	liveDataReducer,
	networksReducer,
	providersReducer,
	websocketMiddleware,
	websocketSlice,
	timeIntervalUtils,
	appStateHooks,
	colorHooks,
	dataHooks,
	intervalHooks,
	liveDataHooks,
	providerHooks,
	queryHooks,
	useLoadValueHooks,
	store,
	useAppSelector,
	useAppDispatch,
	useSetSidechainsIncluded,
	dataTypeToString,
	useSetStoreAPIKey,
	setStoreAPIKey,
	useGetExperimentsFromAppStore,
	setExperiments,
	useGetLiveDataFromAppStore,
	useGetQueryWithAutoRefetch,
	useGetProvidersFromAppStore,
	useGetProviderColorDictionaryFromAppStore,
	useGetProviderTypeColorDictionaryFromAppStore,
	useGetSidechainsIncludedFromAppStore,
	useSetDataModeMutation,
}

export {
	GenericDictionary,
	DataPointDictionary,
	DataResponseModelDictionary,
	InstantDataResponseModel,
	StringDictionary,
	AnyDictionary,
}

export {
	toShortString_2,
	toShortString,
	fromShortString,
	fromShortString_2,
	extractData,
	getModeData,
	TV,
	TimeValue,
	StringTimeValue,
	appModeToUIFormat,
	inline,
	uniform,
	numberFormat,
	shortTimeIntervalToUIFormat,
}

export {
	IL2DataRequestHandler,
	L2DataRequestModel,
	IRequestHandler,
	IDataGetter,
	L2DataResponseModel,
	IModeChangedHandler,
	IIntervalChangedHandler,
	IIncludeSidechainsChangedHandler,
	useHandler,
	Handler,
	IHandler,
	INetworkChangedHandler,
	IOptionalCallback,
	IOptionalDefault,
	createHandlerFromCallback,
}

export { handleException }
export {
	DataPoint,
	ProviderResponseModel,
	ProviderModel,
	IProviderExternalWebsite,
	DatedXYDataPoint,
	StringXYDataPoint,
	NumericXYDataPoint,
	Dataset,
	TimeInterval,
}
