import {
  GeneralApi,
  GPSApi,
  TPSApi,
  GasAdjustedTPSApi,
  ProviderResponseModel,
  RequestContext,
  ResponseContext,
  TimeInterval,
  Configuration,
  ExperimentApi,
  APIKeyApi,
  ApiAPIKeyGetNewKeyGetRequest,
} from "ethtps.api.client"
import {
  tryLoadAPIKeyFromLocalStorage,
  getAPIKey,
  BASE_PATH,
} from "../DependenciesIOC"
import { Observable } from "@reduxjs/toolkit"
import { toShortString } from "../../Types"
import { APIKeyMiddleware } from "./APIKeyMiddleware"
import {
  DataResponseModelDictionary,
  DataPointDictionary,
  StringDictionary,
} from "../../Types.dictionaries"
import { DataType } from "../../Types"

export class ETHTPSApi {
  public generalApi: GeneralApi = new GeneralApi()
  public tpsApi: TPSApi = new TPSApi()
  public gpsApi: GPSApi = new GPSApi()
  public gtpsApi: GasAdjustedTPSApi = new GasAdjustedTPSApi()
  public experimentAPI: ExperimentApi = new ExperimentApi()
  public apiKeyAPI: APIKeyApi
  public apiKey?: string
  private _url: string

  constructor(
    url?: string,
    apiKey?: string,
    useArtificialDelay: boolean = true,
  ) {
    this._url = url as string
    if (!apiKey) {
      tryLoadAPIKeyFromLocalStorage()
      let supposedlyAKey = getAPIKey()
      if (supposedlyAKey) {
        this.apiKey = supposedlyAKey //Definitely a key
      }
    }
    this.apiKeyAPI = new APIKeyApi(
      new Configuration({
        basePath: url,
      }),
    )
    this.resetConfig(this._url)
  }

  private _genConfig(url: string) {
    let config = new Configuration({
      basePath: url,
      middleware: [new APIKeyMiddleware()],
    })

    return config
  }

  public resetConfig(url: string = BASE_PATH) {
    let config = this._genConfig(url)
    this.generalApi = new GeneralApi(config)
    this.tpsApi = new TPSApi(config)
    this.gpsApi = new GPSApi(config)
    this.gtpsApi = new GasAdjustedTPSApi(config)
    this.experimentAPI = new ExperimentApi(config)
    this.apiKeyAPI = new APIKeyApi(
      new Configuration({
        basePath: url,
      }),
    )
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

  public getData(
    dataType: DataType,
    interval: string,
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
  ): Promise<DataResponseModelDictionary> {
    switch (dataType) {
      case DataType.TPS:
        return this.tpsApi.aPITPSGetGet({
          provider,
          network,
          includeSidechains,
          interval,
        })
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSGetGet({
          provider,
          network,
          includeSidechains,
          interval,
        })
      case DataType.GPS:
        return this.gpsApi.aPIGPSGetGet({
          provider,
          network,
          includeSidechains,
          interval,
        })
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
        return this.tpsApi.aPITPSMaxGet({
          provider,
          network,
          includeSidechains,
        })
      case DataType.GPS:
        return this.gpsApi.aPIGPSMaxGet({
          provider,
          network,
          includeSidechains,
        })
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSMaxGet({
          provider,
          network,
          includeSidechains,
        })
      default:
        return undefined
    }
  }

  public getInstantData(smoothing: TimeInterval) {
    return this.generalApi.aPIV2InstantDataGet({
      includeSidechains: true,
      //toShortString_2(smoothing),
    })
  }

  public getNewAPIKey(humanityProof: string) {
    return this.apiKeyAPI.apiAPIKeyGetNewKeyGet({ humanityProof })
  }

  public getProviderColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ColorDictionaryGet()
  }

  public getProviderTypeColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ProviderTypesColorDictionaryGet()
  }

  public getIntervalsWithData(provider: string) {
    return this.generalApi.aPIV2GetIntervalsWithDataGet({ provider })
  }

  public getAvailableExperiments(deviceType: string) {
    return this.experimentAPI.apiBetaExperimentsAvailableExperimentsGet({
      deviceType,
    })
  }
}
