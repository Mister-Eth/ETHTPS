import { ResponseContext, RequestContext, HttpFile } from '../http/http'
import * as models from '../models/all'
import { Configuration } from '../configuration'

import { AllDataModel } from '../models/AllDataModel'
import { BlockInfoProviderStatus } from '../models/BlockInfoProviderStatus'
import { BlockInfoProviderStatusResult } from '../models/BlockInfoProviderStatusResult'
import { ChartData } from '../models/ChartData'
import { DataPoint } from '../models/DataPoint'
import { DataResponseModel } from '../models/DataResponseModel'
import { DataType } from '../models/DataType'
import { HomePageResponseModel } from '../models/HomePageResponseModel'
import { ProviderModel } from '../models/ProviderModel'
import { ProviderResponseModel } from '../models/ProviderResponseModel'
import { TimeInterval } from '../models/TimeInterval'
import { TimeWarpSyncProgressModel } from '../models/TimeWarpSyncProgressModel'
import { ObservableGPSApi } from './ObservableAPI'

import { GPSApiRequestFactory, GPSApiResponseProcessor } from "../apis/GPSApi"
import { ObservableGasAdjustedTPSApi } from './ObservableAPI'

import { GasAdjustedTPSApiRequestFactory, GasAdjustedTPSApiResponseProcessor } from "../apis/GasAdjustedTPSApi"
import { ObservableGeneralApi } from './ObservableAPI'

import { GeneralApiRequestFactory, GeneralApiResponseProcessor } from "../apis/GeneralApi"
import { ObservableIngestionApi } from './ObservableAPI'

import { IngestionApiRequestFactory, IngestionApiResponseProcessor } from "../apis/IngestionApi"
import { ObservablePageModelApi } from './ObservableAPI'

import { PageModelApiRequestFactory, PageModelApiResponseProcessor } from "../apis/PageModelApi"
import { ObservableStatusApi } from './ObservableAPI'

import { StatusApiRequestFactory, StatusApiResponseProcessor } from "../apis/StatusApi"
import { ObservableTPSApi } from './ObservableAPI'

import { TPSApiRequestFactory, TPSApiResponseProcessor } from "../apis/TPSApi"
import { ObservableTimeWarpApi } from './ObservableAPI'

import { TimeWarpApiRequestFactory, TimeWarpApiResponseProcessor } from "../apis/TimeWarpApi"
export class PromiseGPSApi {
    private api: ObservableGPSApi

    public constructor(
        configuration: Configuration,
        requestFactory?: GPSApiRequestFactory,
        responseProcessor?: GPSApiResponseProcessor
    ) {
        this.api = new ObservableGPSApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPIGPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPIGPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPIGPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPIGPSGetGet(provider, network, includeSidechains, interval, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: Array<DataPoint> }> {
        const result = this.api.aPIGPSInstantGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: DataPoint }> {
        const result = this.api.aPIGPSMaxGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }


}



export class PromiseGasAdjustedTPSApi {
    private api: ObservableGasAdjustedTPSApi

    public constructor(
        configuration: Configuration,
        requestFactory?: GasAdjustedTPSApiRequestFactory,
        responseProcessor?: GasAdjustedTPSApiResponseProcessor
    ) {
        this.api = new ObservableGasAdjustedTPSApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPIGasAdjustedTPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPIGasAdjustedTPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPIGasAdjustedTPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPIGasAdjustedTPSGetGet(provider, network, includeSidechains, interval, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGasAdjustedTPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: Array<DataPoint> }> {
        const result = this.api.aPIGasAdjustedTPSInstantGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGasAdjustedTPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: DataPoint }> {
        const result = this.api.aPIGasAdjustedTPSMaxGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }


}



export class PromiseGeneralApi {
    private api: ObservableGeneralApi

    public constructor(
        configuration: Configuration,
        requestFactory?: GeneralApiRequestFactory,
        responseProcessor?: GeneralApiResponseProcessor
    ) {
        this.api = new ObservableGeneralApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param network 
     */
    public aPIV2AllDataGet(network?: string, _options?: Configuration): Promise<AllDataModel> {
        const result = this.api.aPIV2AllDataGet(network, _options)
        return result.toPromise()
    }

    /**
     */
    public aPIV2ColorDictionaryGet(_options?: Configuration): Promise<{ [key: string]: string }> {
        const result = this.api.aPIV2ColorDictionaryGet(_options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2GetIntervalsWithDataGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.aPIV2GetIntervalsWithDataGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2GetUniqueDataYearsGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<Array<string>> {
        const result = this.api.aPIV2GetUniqueDataYearsGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param smoothing 
     */
    public aPIV2InstantDataGet(provider?: string, network?: string, includeSidechains?: boolean, smoothing?: string, _options?: Configuration): Promise<{ [key: string]: any }> {
        const result = this.api.aPIV2InstantDataGet(provider, network, includeSidechains, smoothing, _options)
        return result.toPromise()
    }

    /**
     */
    public aPIV2IntervalsGet(_options?: Configuration): Promise<Array<string>> {
        const result = this.api.aPIV2IntervalsGet(_options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2MaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: any }> {
        const result = this.api.aPIV2MaxGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     */
    public aPIV2NetworksGet(_options?: Configuration): Promise<Array<string>> {
        const result = this.api.aPIV2NetworksGet(_options)
        return result.toPromise()
    }

    /**
     */
    public aPIV2ProviderTypesColorDictionaryGet(_options?: Configuration): Promise<{ [key: string]: string }> {
        const result = this.api.aPIV2ProviderTypesColorDictionaryGet(_options)
        return result.toPromise()
    }

    /**
     * @param subchainsOf 
     */
    public aPIV2ProvidersGet(subchainsOf?: string, _options?: Configuration): Promise<Array<ProviderResponseModel>> {
        const result = this.api.aPIV2ProvidersGet(subchainsOf, _options)
        return result.toPromise()
    }


}



export class PromiseIngestionApi {
    private api: ObservableIngestionApi

    public constructor(
        configuration: Configuration,
        requestFactory?: IngestionApiRequestFactory,
        responseProcessor?: IngestionApiResponseProcessor
    ) {
        this.api = new ObservableIngestionApi(configuration, requestFactory, responseProcessor)
    }

    /**
     */
    public apiIngestionPost(_options?: Configuration): Promise<void> {
        const result = this.api.apiIngestionPost(_options)
        return result.toPromise()
    }


}



export class PromisePageModelApi {
    private api: ObservablePageModelApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PageModelApiRequestFactory,
        responseProcessor?: PageModelApiResponseProcessor
    ) {
        this.api = new ObservablePageModelApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param subchainsOf 
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIPagesHomeGet(subchainsOf?: string, interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<HomePageResponseModel> {
        const result = this.api.aPIPagesHomeGet(subchainsOf, interval, dataType, provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIPagesProviderGet(interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<void> {
        const result = this.api.aPIPagesProviderGet(interval, dataType, provider, network, includeSidechains, _options)
        return result.toPromise()
    }


}



export class PromiseStatusApi {
    private api: ObservableStatusApi

    public constructor(
        configuration: Configuration,
        requestFactory?: StatusApiRequestFactory,
        responseProcessor?: StatusApiResponseProcessor
    ) {
        this.api = new ObservableStatusApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public apiStatusGetBlockInfoProviderStatusGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: BlockInfoProviderStatusResult }> {
        const result = this.api.apiStatusGetBlockInfoProviderStatusGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }


}



export class PromiseTPSApi {
    private api: ObservableTPSApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TPSApiRequestFactory,
        responseProcessor?: TPSApiResponseProcessor
    ) {
        this.api = new ObservableTPSApi(configuration, requestFactory, responseProcessor)
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPITPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPITPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPITPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel> }> {
        const result = this.api.aPITPSGetGet(provider, network, includeSidechains, interval, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: Array<DataPoint> }> {
        const result = this.api.aPITPSInstantGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<{ [key: string]: DataPoint }> {
        const result = this.api.aPITPSMaxGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }


}



export class PromiseTimeWarpApi {
    private api: ObservableTimeWarpApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TimeWarpApiRequestFactory,
        responseProcessor?: TimeWarpApiResponseProcessor
    ) {
        this.api = new ObservableTimeWarpApi(configuration, requestFactory, responseProcessor)
    }

    /**
     */
    public aPITimeWarpGetEarliestDateGet(_options?: Configuration): Promise<Date> {
        const result = this.api.aPITimeWarpGetEarliestDateGet(_options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetGPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<Array<DataPoint>> {
        const result = this.api.aPITimeWarpGetGPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetGasAdjustedTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<Array<DataPoint>> {
        const result = this.api.aPITimeWarpGetGasAdjustedTPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITimeWarpGetSyncProgressGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<TimeWarpSyncProgressModel> {
        const result = this.api.aPITimeWarpGetSyncProgressGet(provider, network, includeSidechains, _options)
        return result.toPromise()
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<Array<DataPoint>> {
        const result = this.api.aPITimeWarpGetTPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options)
        return result.toPromise()
    }


}



