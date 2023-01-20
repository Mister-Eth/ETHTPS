import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { AllDataModel } from '../models/AllDataModel';
import { BlockInfoProviderStatus } from '../models/BlockInfoProviderStatus';
import { BlockInfoProviderStatusResult } from '../models/BlockInfoProviderStatusResult';
import { ChartData } from '../models/ChartData';
import { DataPoint } from '../models/DataPoint';
import { DataResponseModel } from '../models/DataResponseModel';
import { DataType } from '../models/DataType';
import { HomePageResponseModel } from '../models/HomePageResponseModel';
import { ProviderModel } from '../models/ProviderModel';
import { ProviderResponseModel } from '../models/ProviderResponseModel';
import { TimeInterval } from '../models/TimeInterval';
import { TimeWarpSyncProgressModel } from '../models/TimeWarpSyncProgressModel';

import { ObservableGPSApi } from "./ObservableAPI";
import { GPSApiRequestFactory, GPSApiResponseProcessor} from "../apis/GPSApi";

export interface GPSApiAPIGPSGeMonthlyDataByYearGetRequest {
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSGeMonthlyDataByYearGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSGeMonthlyDataByYearGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GPSApiaPIGPSGeMonthlyDataByYearGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof GPSApiaPIGPSGeMonthlyDataByYearGet
     */
    year?: number
}

export interface GPSApiAPIGPSGetGetRequest {
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSGetGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSGetGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GPSApiaPIGPSGetGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSGetGet
     */
    interval?: string
}

export interface GPSApiAPIGPSInstantGetRequest {
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSInstantGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSInstantGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GPSApiaPIGPSInstantGet
     */
    includeSidechains?: boolean
}

export interface GPSApiAPIGPSMaxGetRequest {
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSMaxGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GPSApiaPIGPSMaxGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GPSApiaPIGPSMaxGet
     */
    includeSidechains?: boolean
}

export class ObjectGPSApi {
    private api: ObservableGPSApi

    public constructor(configuration: Configuration, requestFactory?: GPSApiRequestFactory, responseProcessor?: GPSApiResponseProcessor) {
        this.api = new ObservableGPSApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPIGPSGeMonthlyDataByYearGet(param: GPSApiAPIGPSGeMonthlyDataByYearGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPIGPSGeMonthlyDataByYearGet(param.provider, param.network, param.includeSidechains, param.year,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGPSGetGet(param: GPSApiAPIGPSGetGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPIGPSGetGet(param.provider, param.network, param.includeSidechains, param.interval,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGPSInstantGet(param: GPSApiAPIGPSInstantGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataPoint>; }> {
        return this.api.aPIGPSInstantGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGPSMaxGet(param: GPSApiAPIGPSMaxGetRequest, options?: Configuration): Promise<{ [key: string]: DataPoint; }> {
        return this.api.aPIGPSMaxGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

}

import { ObservableGasAdjustedTPSApi } from "./ObservableAPI";
import { GasAdjustedTPSApiRequestFactory, GasAdjustedTPSApiResponseProcessor} from "../apis/GasAdjustedTPSApi";

export interface GasAdjustedTPSApiAPIGasAdjustedTPSGeMonthlyDataByYearGetRequest {
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGeMonthlyDataByYearGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGeMonthlyDataByYearGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGeMonthlyDataByYearGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGeMonthlyDataByYearGet
     */
    year?: number
}

export interface GasAdjustedTPSApiAPIGasAdjustedTPSGetGetRequest {
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGetGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGetGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGetGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSGetGet
     */
    interval?: string
}

export interface GasAdjustedTPSApiAPIGasAdjustedTPSInstantGetRequest {
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSInstantGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSInstantGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSInstantGet
     */
    includeSidechains?: boolean
}

export interface GasAdjustedTPSApiAPIGasAdjustedTPSMaxGetRequest {
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSMaxGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSMaxGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GasAdjustedTPSApiaPIGasAdjustedTPSMaxGet
     */
    includeSidechains?: boolean
}

export class ObjectGasAdjustedTPSApi {
    private api: ObservableGasAdjustedTPSApi

    public constructor(configuration: Configuration, requestFactory?: GasAdjustedTPSApiRequestFactory, responseProcessor?: GasAdjustedTPSApiResponseProcessor) {
        this.api = new ObservableGasAdjustedTPSApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPIGasAdjustedTPSGeMonthlyDataByYearGet(param: GasAdjustedTPSApiAPIGasAdjustedTPSGeMonthlyDataByYearGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPIGasAdjustedTPSGeMonthlyDataByYearGet(param.provider, param.network, param.includeSidechains, param.year,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGasAdjustedTPSGetGet(param: GasAdjustedTPSApiAPIGasAdjustedTPSGetGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPIGasAdjustedTPSGetGet(param.provider, param.network, param.includeSidechains, param.interval,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGasAdjustedTPSInstantGet(param: GasAdjustedTPSApiAPIGasAdjustedTPSInstantGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataPoint>; }> {
        return this.api.aPIGasAdjustedTPSInstantGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIGasAdjustedTPSMaxGet(param: GasAdjustedTPSApiAPIGasAdjustedTPSMaxGetRequest, options?: Configuration): Promise<{ [key: string]: DataPoint; }> {
        return this.api.aPIGasAdjustedTPSMaxGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

}

import { ObservableGeneralApi } from "./ObservableAPI";
import { GeneralApiRequestFactory, GeneralApiResponseProcessor} from "../apis/GeneralApi";

export interface GeneralApiAPIV2AllDataGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2AllDataGet
     */
    network?: string
}

export interface GeneralApiAPIV2ColorDictionaryGetRequest {
}

export interface GeneralApiAPIV2GetIntervalsWithDataGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2GetIntervalsWithDataGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2GetIntervalsWithDataGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GeneralApiaPIV2GetIntervalsWithDataGet
     */
    includeSidechains?: boolean
}

export interface GeneralApiAPIV2GetUniqueDataYearsGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2GetUniqueDataYearsGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2GetUniqueDataYearsGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GeneralApiaPIV2GetUniqueDataYearsGet
     */
    includeSidechains?: boolean
}

export interface GeneralApiAPIV2InstantDataGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2InstantDataGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2InstantDataGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GeneralApiaPIV2InstantDataGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2InstantDataGet
     */
    smoothing?: string
}

export interface GeneralApiAPIV2IntervalsGetRequest {
}

export interface GeneralApiAPIV2MaxGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2MaxGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2MaxGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof GeneralApiaPIV2MaxGet
     */
    includeSidechains?: boolean
}

export interface GeneralApiAPIV2NetworksGetRequest {
}

export interface GeneralApiAPIV2ProviderTypesColorDictionaryGetRequest {
}

export interface GeneralApiAPIV2ProvidersGetRequest {
    /**
     * 
     * @type string
     * @memberof GeneralApiaPIV2ProvidersGet
     */
    subchainsOf?: string
}

export class ObjectGeneralApi {
    private api: ObservableGeneralApi

    public constructor(configuration: Configuration, requestFactory?: GeneralApiRequestFactory, responseProcessor?: GeneralApiResponseProcessor) {
        this.api = new ObservableGeneralApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPIV2AllDataGet(param: GeneralApiAPIV2AllDataGetRequest, options?: Configuration): Promise<AllDataModel> {
        return this.api.aPIV2AllDataGet(param.network,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2ColorDictionaryGet(param: GeneralApiAPIV2ColorDictionaryGetRequest, options?: Configuration): Promise<{ [key: string]: string; }> {
        return this.api.aPIV2ColorDictionaryGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2GetIntervalsWithDataGet(param: GeneralApiAPIV2GetIntervalsWithDataGetRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.aPIV2GetIntervalsWithDataGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2GetUniqueDataYearsGet(param: GeneralApiAPIV2GetUniqueDataYearsGetRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.aPIV2GetUniqueDataYearsGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2InstantDataGet(param: GeneralApiAPIV2InstantDataGetRequest, options?: Configuration): Promise<{ [key: string]: any; }> {
        return this.api.aPIV2InstantDataGet(param.provider, param.network, param.includeSidechains, param.smoothing,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2IntervalsGet(param: GeneralApiAPIV2IntervalsGetRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.aPIV2IntervalsGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2MaxGet(param: GeneralApiAPIV2MaxGetRequest, options?: Configuration): Promise<{ [key: string]: any; }> {
        return this.api.aPIV2MaxGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2NetworksGet(param: GeneralApiAPIV2NetworksGetRequest, options?: Configuration): Promise<Array<string>> {
        return this.api.aPIV2NetworksGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2ProviderTypesColorDictionaryGet(param: GeneralApiAPIV2ProviderTypesColorDictionaryGetRequest, options?: Configuration): Promise<{ [key: string]: string; }> {
        return this.api.aPIV2ProviderTypesColorDictionaryGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIV2ProvidersGet(param: GeneralApiAPIV2ProvidersGetRequest, options?: Configuration): Promise<Array<ProviderResponseModel>> {
        return this.api.aPIV2ProvidersGet(param.subchainsOf,  options).toPromise();
    }

}

import { ObservableIngestionApi } from "./ObservableAPI";
import { IngestionApiRequestFactory, IngestionApiResponseProcessor} from "../apis/IngestionApi";

export interface IngestionApiApiIngestionPostRequest {
}

export class ObjectIngestionApi {
    private api: ObservableIngestionApi

    public constructor(configuration: Configuration, requestFactory?: IngestionApiRequestFactory, responseProcessor?: IngestionApiResponseProcessor) {
        this.api = new ObservableIngestionApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiIngestionPost(param: IngestionApiApiIngestionPostRequest, options?: Configuration): Promise<void> {
        return this.api.apiIngestionPost( options).toPromise();
    }

}

import { ObservablePageModelApi } from "./ObservableAPI";
import { PageModelApiRequestFactory, PageModelApiResponseProcessor} from "../apis/PageModelApi";

export interface PageModelApiAPIPagesHomeGetRequest {
    /**
     * 
     * @type string
     * @memberof PageModelApiaPIPagesHomeGet
     */
    subchainsOf?: string
    /**
     * 
     * @type TimeInterval
     * @memberof PageModelApiaPIPagesHomeGet
     */
    interval?: TimeInterval
    /**
     * 
     * @type DataType
     * @memberof PageModelApiaPIPagesHomeGet
     */
    dataType?: DataType
    /**
     * 
     * @type string
     * @memberof PageModelApiaPIPagesHomeGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof PageModelApiaPIPagesHomeGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof PageModelApiaPIPagesHomeGet
     */
    includeSidechains?: boolean
}

export interface PageModelApiAPIPagesProviderGetRequest {
    /**
     * 
     * @type TimeInterval
     * @memberof PageModelApiaPIPagesProviderGet
     */
    interval?: TimeInterval
    /**
     * 
     * @type DataType
     * @memberof PageModelApiaPIPagesProviderGet
     */
    dataType?: DataType
    /**
     * 
     * @type string
     * @memberof PageModelApiaPIPagesProviderGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof PageModelApiaPIPagesProviderGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof PageModelApiaPIPagesProviderGet
     */
    includeSidechains?: boolean
}

export class ObjectPageModelApi {
    private api: ObservablePageModelApi

    public constructor(configuration: Configuration, requestFactory?: PageModelApiRequestFactory, responseProcessor?: PageModelApiResponseProcessor) {
        this.api = new ObservablePageModelApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPIPagesHomeGet(param: PageModelApiAPIPagesHomeGetRequest, options?: Configuration): Promise<HomePageResponseModel> {
        return this.api.aPIPagesHomeGet(param.subchainsOf, param.interval, param.dataType, param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPIPagesProviderGet(param: PageModelApiAPIPagesProviderGetRequest, options?: Configuration): Promise<void> {
        return this.api.aPIPagesProviderGet(param.interval, param.dataType, param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

}

import { ObservableStatusApi } from "./ObservableAPI";
import { StatusApiRequestFactory, StatusApiResponseProcessor} from "../apis/StatusApi";

export interface StatusApiApiStatusGetBlockInfoProviderStatusGetRequest {
    /**
     * 
     * @type string
     * @memberof StatusApiapiStatusGetBlockInfoProviderStatusGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof StatusApiapiStatusGetBlockInfoProviderStatusGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof StatusApiapiStatusGetBlockInfoProviderStatusGet
     */
    includeSidechains?: boolean
}

export class ObjectStatusApi {
    private api: ObservableStatusApi

    public constructor(configuration: Configuration, requestFactory?: StatusApiRequestFactory, responseProcessor?: StatusApiResponseProcessor) {
        this.api = new ObservableStatusApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiStatusGetBlockInfoProviderStatusGet(param: StatusApiApiStatusGetBlockInfoProviderStatusGetRequest, options?: Configuration): Promise<{ [key: string]: BlockInfoProviderStatusResult; }> {
        return this.api.apiStatusGetBlockInfoProviderStatusGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

}

import { ObservableTPSApi } from "./ObservableAPI";
import { TPSApiRequestFactory, TPSApiResponseProcessor} from "../apis/TPSApi";

export interface TPSApiAPITPSGeMonthlyDataByYearGetRequest {
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSGeMonthlyDataByYearGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSGeMonthlyDataByYearGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TPSApiaPITPSGeMonthlyDataByYearGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof TPSApiaPITPSGeMonthlyDataByYearGet
     */
    year?: number
}

export interface TPSApiAPITPSGetGetRequest {
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSGetGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSGetGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TPSApiaPITPSGetGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSGetGet
     */
    interval?: string
}

export interface TPSApiAPITPSInstantGetRequest {
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSInstantGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSInstantGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TPSApiaPITPSInstantGet
     */
    includeSidechains?: boolean
}

export interface TPSApiAPITPSMaxGetRequest {
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSMaxGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TPSApiaPITPSMaxGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TPSApiaPITPSMaxGet
     */
    includeSidechains?: boolean
}

export class ObjectTPSApi {
    private api: ObservableTPSApi

    public constructor(configuration: Configuration, requestFactory?: TPSApiRequestFactory, responseProcessor?: TPSApiResponseProcessor) {
        this.api = new ObservableTPSApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPITPSGeMonthlyDataByYearGet(param: TPSApiAPITPSGeMonthlyDataByYearGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPITPSGeMonthlyDataByYearGet(param.provider, param.network, param.includeSidechains, param.year,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITPSGetGet(param: TPSApiAPITPSGetGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataResponseModel>; }> {
        return this.api.aPITPSGetGet(param.provider, param.network, param.includeSidechains, param.interval,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITPSInstantGet(param: TPSApiAPITPSInstantGetRequest, options?: Configuration): Promise<{ [key: string]: Array<DataPoint>; }> {
        return this.api.aPITPSInstantGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITPSMaxGet(param: TPSApiAPITPSMaxGetRequest, options?: Configuration): Promise<{ [key: string]: DataPoint; }> {
        return this.api.aPITPSMaxGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

}

import { ObservableTimeWarpApi } from "./ObservableAPI";
import { TimeWarpApiRequestFactory, TimeWarpApiResponseProcessor} from "../apis/TimeWarpApi";

export interface TimeWarpApiAPITimeWarpGetEarliestDateGetRequest {
}

export interface TimeWarpApiAPITimeWarpGetGPSAtGetRequest {
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    timestamp?: number
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    smoothing?: string
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetGPSAtGet
     */
    count?: number
}

export interface TimeWarpApiAPITimeWarpGetGasAdjustedTPSAtGetRequest {
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    timestamp?: number
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    smoothing?: string
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetGasAdjustedTPSAtGet
     */
    count?: number
}

export interface TimeWarpApiAPITimeWarpGetSyncProgressGetRequest {
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetSyncProgressGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetSyncProgressGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TimeWarpApiaPITimeWarpGetSyncProgressGet
     */
    includeSidechains?: boolean
}

export interface TimeWarpApiAPITimeWarpGetTPSAtGetRequest {
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    provider?: string
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    network?: string
    /**
     * 
     * @type boolean
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    includeSidechains?: boolean
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    timestamp?: number
    /**
     * 
     * @type string
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    smoothing?: string
    /**
     * 
     * @type number
     * @memberof TimeWarpApiaPITimeWarpGetTPSAtGet
     */
    count?: number
}

export class ObjectTimeWarpApi {
    private api: ObservableTimeWarpApi

    public constructor(configuration: Configuration, requestFactory?: TimeWarpApiRequestFactory, responseProcessor?: TimeWarpApiResponseProcessor) {
        this.api = new ObservableTimeWarpApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public aPITimeWarpGetEarliestDateGet(param: TimeWarpApiAPITimeWarpGetEarliestDateGetRequest, options?: Configuration): Promise<Date> {
        return this.api.aPITimeWarpGetEarliestDateGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITimeWarpGetGPSAtGet(param: TimeWarpApiAPITimeWarpGetGPSAtGetRequest, options?: Configuration): Promise<Array<DataPoint>> {
        return this.api.aPITimeWarpGetGPSAtGet(param.provider, param.network, param.includeSidechains, param.timestamp, param.smoothing, param.count,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITimeWarpGetGasAdjustedTPSAtGet(param: TimeWarpApiAPITimeWarpGetGasAdjustedTPSAtGetRequest, options?: Configuration): Promise<Array<DataPoint>> {
        return this.api.aPITimeWarpGetGasAdjustedTPSAtGet(param.provider, param.network, param.includeSidechains, param.timestamp, param.smoothing, param.count,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITimeWarpGetSyncProgressGet(param: TimeWarpApiAPITimeWarpGetSyncProgressGetRequest, options?: Configuration): Promise<TimeWarpSyncProgressModel> {
        return this.api.aPITimeWarpGetSyncProgressGet(param.provider, param.network, param.includeSidechains,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public aPITimeWarpGetTPSAtGet(param: TimeWarpApiAPITimeWarpGetTPSAtGetRequest, options?: Configuration): Promise<Array<DataPoint>> {
        return this.api.aPITimeWarpGetTPSAtGet(param.provider, param.network, param.includeSidechains, param.timestamp, param.smoothing, param.count,  options).toPromise();
    }

}
