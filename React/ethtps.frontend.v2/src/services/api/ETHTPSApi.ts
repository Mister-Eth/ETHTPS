import { createConfiguration, Configuration } from "../api-gen/configuration"
import {
  ApiKeyConfiguration,
  GPSApi,
  GasAdjustedTPSApi,
  GeneralApi,
  ProviderResponseModel,
  RequestContext,
  ResponseContext,
  ServerConfiguration,
  TPSApi,
} from "../api-gen/index"
import { TimeInterval, toShortString } from "../../models/TimeIntervals"
import { DataType } from "../../Types"
import { configureAuthMethods } from "../api-gen/auth/auth"
import {
  DataResponseModelDictionary,
  DataPointDictionary,
  StringDictionary,
} from "../../Types.dictionaries"
import { Observable } from "../api-gen/rxjsStub"

export class ETHTPSApi {
  public generalApi: GeneralApi
  public tpsApi: TPSApi
  public gpsApi: GPSApi
  public gtpsApi: GasAdjustedTPSApi

  public apiKey?: string
  private _url: string

  constructor(
    url?: string,
    apiKey?: string,
    useArtificialDelay: boolean = true,
  ) {
    url ??= ""
    this._url = url
    if (!apiKey) {
      let supposedlyAKey = localStorage.getItem("XAPIKey")
      if (supposedlyAKey) {
        this.apiKey = supposedlyAKey //Definitely a key
      }
    }
    let config = this._genConfig()
    this.generalApi = new GeneralApi(config)
    this.tpsApi = new TPSApi(config)
    this.gpsApi = new GPSApi(config)
    this.gtpsApi = new GasAdjustedTPSApi(config)
  }

  private _genConfig() {
    return createConfiguration({
      baseServer: new ServerConfiguration(this._url, {
        XAPIKey: this.apiKey as string,
      }),
      middleware: [
        {
          pre: (context: RequestContext): Observable<RequestContext> => {
            context.setHeaderParam("X-API-Key", this.apiKey as string)
            return new Observable<RequestContext>(Promise.resolve(context))
          },
          post: (context: ResponseContext): Observable<ResponseContext> => {
            return new Observable<ResponseContext>(Promise.resolve(context))
          },
        },
      ],
    })
  }

  public resetConfig() {
    let config = this._genConfig()
    this.generalApi = new GeneralApi(config)
    this.tpsApi = new TPSApi(config)
    this.gpsApi = new GPSApi(config)
    this.gtpsApi = new GasAdjustedTPSApi(config)
  }

  public getProviders(): Promise<ProviderResponseModel[]> {
    return this.generalApi.aPIV2ProvidersGet()
  }

  public getNetworks(): Promise<Array<string>> {
    return this.generalApi.aPIV2NetworksGet()
  }

  public getIntervals(): Promise<string[]> {
    return this.generalApi.aPIV2IntervalsGet()
  }

  public getData<DataType>(
    dataType: DataType,
    interval: string,
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
  ): Promise<DataResponseModelDictionary> {
    switch (dataType) {
      case DataType.GPS:
        return this.gpsApi.aPIGPSGetGet(
          provider,
          network,
          includeSidechains,
          interval,
        )
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSGetGet(
          provider,
          network,
          includeSidechains,
          interval,
        )
      case DataType.TPS:
        return this.tpsApi.aPITPSGetGet(
          provider,
          network,
          includeSidechains,
          interval,
        )
      default:
        throw TypeError("Invalid data type")
    }
  }

  public getMax(
    dataType: DataType,
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
  ): Promise<DataPointDictionary> | undefined {
    switch (dataType) {
      case DataType.TPS:
        return this.tpsApi.aPITPSMaxGet(provider, network, includeSidechains)
      case DataType.GPS:
        return this.gpsApi.aPIGPSMaxGet(provider, network, includeSidechains)
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSMaxGet(
          provider,
          network,
          includeSidechains,
        )
      default:
        return undefined
    }
  }

  public getInstantData(smoothing: TimeInterval) {
    return this.generalApi.aPIV2InstantDataGet(
      undefined,
      undefined,
      true,
      toShortString(smoothing),
    )
  }

  public getNewAPIKey(humanityProof: string) {
    return fetch(
      this._url + "/api/APIKey/GetNewKey?humanityProof=" + humanityProof,
    )
  }

  public getProviderColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ColorDictionaryGet()
  }

  public getProviderTypeColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ProviderTypesColorDictionaryGet()
  }

  public getIntervalsWithData(provider: string) {
    return this.generalApi.aPIV2GetIntervalsWithDataGet(provider)
  }

  public getAvailableExperiments(deviceType: string) {
    return fetch(
      this._url +
        "/api/beta/experiments/AvailableExperiments?deviceType=" +
        deviceType +
        "&XAPIKey=" +
        this.apiKey,
    ).then((response) => {
      return response.text().then((text) => {
        return JSON.parse(text) as number[]
      })
    })
  }
}
