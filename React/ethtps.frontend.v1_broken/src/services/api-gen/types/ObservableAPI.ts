import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration } from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import { mergeMap, map } from '../rxjsStub';
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

import { GPSApiRequestFactory, GPSApiResponseProcessor } from "../apis/GPSApi";
import { GasAdjustedTPSApiRequestFactory, GasAdjustedTPSApiResponseProcessor } from "../apis/GasAdjustedTPSApi";
import { GeneralApiRequestFactory, GeneralApiResponseProcessor } from "../apis/GeneralApi";
import { IngestionApiRequestFactory, IngestionApiResponseProcessor } from "../apis/IngestionApi";
import { PageModelApiRequestFactory, PageModelApiResponseProcessor } from "../apis/PageModelApi";
import { StatusApiRequestFactory, StatusApiResponseProcessor } from "../apis/StatusApi";

import { TPSApiRequestFactory, TPSApiResponseProcessor } from "../apis/TPSApi";
import { TimeWarpApiRequestFactory, TimeWarpApiResponseProcessor } from "../apis/TimeWarpApi";
export class ObservableGPSApi {
    private requestFactory: GPSApiRequestFactory;
    private responseProcessor: GPSApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: GPSApiRequestFactory,
        responseProcessor?: GPSApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new GPSApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new GPSApiResponseProcessor();
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPIGPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPIGPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGPSGeMonthlyDataByYearGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPIGPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPIGPSGetGet(provider, network, includeSidechains, interval, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGPSGetGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: Array<DataPoint>; }> {
        const requestContextPromise = this.requestFactory.aPIGPSInstantGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGPSInstantGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: DataPoint; }> {
        const requestContextPromise = this.requestFactory.aPIGPSMaxGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGPSMaxGet(rsp)));
            }));
    }

}

export class ObservableGasAdjustedTPSApi {
    private requestFactory: GasAdjustedTPSApiRequestFactory;
    private responseProcessor: GasAdjustedTPSApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: GasAdjustedTPSApiRequestFactory,
        responseProcessor?: GasAdjustedTPSApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new GasAdjustedTPSApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new GasAdjustedTPSApiResponseProcessor();
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPIGasAdjustedTPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPIGasAdjustedTPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGasAdjustedTPSGeMonthlyDataByYearGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPIGasAdjustedTPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPIGasAdjustedTPSGetGet(provider, network, includeSidechains, interval, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGasAdjustedTPSGetGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGasAdjustedTPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: Array<DataPoint>; }> {
        const requestContextPromise = this.requestFactory.aPIGasAdjustedTPSInstantGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGasAdjustedTPSInstantGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIGasAdjustedTPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: DataPoint; }> {
        const requestContextPromise = this.requestFactory.aPIGasAdjustedTPSMaxGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIGasAdjustedTPSMaxGet(rsp)));
            }));
    }

}

export class ObservableGeneralApi {
    private requestFactory: GeneralApiRequestFactory;
    private responseProcessor: GeneralApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: GeneralApiRequestFactory,
        responseProcessor?: GeneralApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new GeneralApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new GeneralApiResponseProcessor();
    }

    /**
     * @param network 
     */
    public aPIV2AllDataGet(network?: string, _options?: Configuration): Observable<AllDataModel> {
        const requestContextPromise = this.requestFactory.aPIV2AllDataGet(network, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2AllDataGet(rsp)));
            }));
    }

    /**
     */
    public aPIV2ColorDictionaryGet(_options?: Configuration): Observable<{ [key: string]: string; }> {
        const requestContextPromise = this.requestFactory.aPIV2ColorDictionaryGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2ColorDictionaryGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2GetIntervalsWithDataGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<Array<string>> {
        const requestContextPromise = this.requestFactory.aPIV2GetIntervalsWithDataGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2GetIntervalsWithDataGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2GetUniqueDataYearsGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<Array<string>> {
        const requestContextPromise = this.requestFactory.aPIV2GetUniqueDataYearsGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2GetUniqueDataYearsGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param smoothing 
     */
    public aPIV2InstantDataGet(provider?: string, network?: string, includeSidechains?: boolean, smoothing?: string, _options?: Configuration): Observable<{ [key: string]: any; }> {
        const requestContextPromise = this.requestFactory.aPIV2InstantDataGet(provider, network, includeSidechains, smoothing, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2InstantDataGet(rsp)));
            }));
    }

    /**
     */
    public aPIV2IntervalsGet(_options?: Configuration): Observable<Array<string>> {
        const requestContextPromise = this.requestFactory.aPIV2IntervalsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2IntervalsGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIV2MaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: any; }> {
        const requestContextPromise = this.requestFactory.aPIV2MaxGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2MaxGet(rsp)));
            }));
    }

    /**
     */
    public aPIV2NetworksGet(_options?: Configuration): Observable<Array<string>> {
        const requestContextPromise = this.requestFactory.aPIV2NetworksGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2NetworksGet(rsp)));
            }));
    }

    /**
     */
    public aPIV2ProviderTypesColorDictionaryGet(_options?: Configuration): Observable<{ [key: string]: string; }> {
        const requestContextPromise = this.requestFactory.aPIV2ProviderTypesColorDictionaryGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2ProviderTypesColorDictionaryGet(rsp)));
            }));
    }

    /**
     * @param subchainsOf 
     */
    public aPIV2ProvidersGet(subchainsOf?: string, _options?: Configuration): Observable<Array<ProviderResponseModel>> {
        const requestContextPromise = this.requestFactory.aPIV2ProvidersGet(subchainsOf, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIV2ProvidersGet(rsp)));
            }));
    }

}

export class ObservableIngestionApi {
    private requestFactory: IngestionApiRequestFactory;
    private responseProcessor: IngestionApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: IngestionApiRequestFactory,
        responseProcessor?: IngestionApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new IngestionApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new IngestionApiResponseProcessor();
    }

    /**
     */
    public apiIngestionPost(_options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.apiIngestionPost(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiIngestionPost(rsp)));
            }));
    }

}

export class ObservablePageModelApi {
    private requestFactory: PageModelApiRequestFactory;
    private responseProcessor: PageModelApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: PageModelApiRequestFactory,
        responseProcessor?: PageModelApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new PageModelApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new PageModelApiResponseProcessor();
    }

    /**
     * @param subchainsOf 
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIPagesHomeGet(subchainsOf?: string, interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<HomePageResponseModel> {
        const requestContextPromise = this.requestFactory.aPIPagesHomeGet(subchainsOf, interval, dataType, provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIPagesHomeGet(rsp)));
            }));
    }

    /**
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPIPagesProviderGet(interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<void> {
        const requestContextPromise = this.requestFactory.aPIPagesProviderGet(interval, dataType, provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPIPagesProviderGet(rsp)));
            }));
    }

}

export class ObservableStatusApi {
    private requestFactory: StatusApiRequestFactory;
    private responseProcessor: StatusApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: StatusApiRequestFactory,
        responseProcessor?: StatusApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new StatusApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new StatusApiResponseProcessor();
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public apiStatusGetBlockInfoProviderStatusGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: BlockInfoProviderStatusResult; }> {
        const requestContextPromise = this.requestFactory.apiStatusGetBlockInfoProviderStatusGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiStatusGetBlockInfoProviderStatusGet(rsp)));
            }));
    }

}
export class ObservableTPSApi {
    private requestFactory: TPSApiRequestFactory;
    private responseProcessor: TPSApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TPSApiRequestFactory,
        responseProcessor?: TPSApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TPSApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TPSApiResponseProcessor();
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param year 
     */
    public aPITPSGeMonthlyDataByYearGet(provider?: string, network?: string, includeSidechains?: boolean, year?: number, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPITPSGeMonthlyDataByYearGet(provider, network, includeSidechains, year, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITPSGeMonthlyDataByYearGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param interval 
     */
    public aPITPSGetGet(provider?: string, network?: string, includeSidechains?: boolean, interval?: string, _options?: Configuration): Observable<{ [key: string]: Array<DataResponseModel>; }> {
        const requestContextPromise = this.requestFactory.aPITPSGetGet(provider, network, includeSidechains, interval, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITPSGetGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITPSInstantGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: Array<DataPoint>; }> {
        const requestContextPromise = this.requestFactory.aPITPSInstantGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITPSInstantGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITPSMaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<{ [key: string]: DataPoint; }> {
        const requestContextPromise = this.requestFactory.aPITPSMaxGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITPSMaxGet(rsp)));
            }));
    }

}

export class ObservableTimeWarpApi {
    private requestFactory: TimeWarpApiRequestFactory;
    private responseProcessor: TimeWarpApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TimeWarpApiRequestFactory,
        responseProcessor?: TimeWarpApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TimeWarpApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TimeWarpApiResponseProcessor();
    }

    /**
     */
    public aPITimeWarpGetEarliestDateGet(_options?: Configuration): Observable<Date> {
        const requestContextPromise = this.requestFactory.aPITimeWarpGetEarliestDateGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITimeWarpGetEarliestDateGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetGPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Observable<Array<DataPoint>> {
        const requestContextPromise = this.requestFactory.aPITimeWarpGetGPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITimeWarpGetGPSAtGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetGasAdjustedTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Observable<Array<DataPoint>> {
        const requestContextPromise = this.requestFactory.aPITimeWarpGetGasAdjustedTPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITimeWarpGetGasAdjustedTPSAtGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public aPITimeWarpGetSyncProgressGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Observable<TimeWarpSyncProgressModel> {
        const requestContextPromise = this.requestFactory.aPITimeWarpGetSyncProgressGet(provider, network, includeSidechains, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITimeWarpGetSyncProgressGet(rsp)));
            }));
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public aPITimeWarpGetTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Observable<Array<DataPoint>> {
        const requestContextPromise = this.requestFactory.aPITimeWarpGetTPSAtGet(provider, network, includeSidechains, timestamp, smoothing, count, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aPITimeWarpGetTPSAtGet(rsp)));
            }));
    }

}
