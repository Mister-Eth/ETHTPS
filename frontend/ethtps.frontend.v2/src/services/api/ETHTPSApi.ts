import {
  GeneralApi,
  GPSApi,
  TPSApi,
  GasAdjustedTPSApi,
  ProviderResponseModel,
  TimeInterval,
  Configuration,
  ExperimentApi,
  APIKeyApi,
  ExternalWebsitesApi,
  MarkdownPagesApi,
} from "ethtps.api.client"
import {
  tryLoadAPIKeyFromLocalStorage,
  getAPIKey,
  BASE_PATH,
} from "../DependenciesIOC"
import { APIKeyMiddleware } from "./APIKeyMiddleware"
import {
  DataResponseModelDictionary,
  DataPointDictionary,
  StringDictionary,
} from "../../Types.dictionaries"
import { DataType } from "../../Types"

export class ETHTPSApi {
  public generalApi: GeneralApi = new GeneralApi()
  private _generalApiEndpoint: string
  public tpsApi: TPSApi = new TPSApi()
  private _tpsApiEndpoint: string
  public gpsApi: GPSApi = new GPSApi()
  private _gpsApiEndpoint: string
  public gtpsApi: GasAdjustedTPSApi = new GasAdjustedTPSApi()
  private _gtpsApiEndpoint: string
  public experimentAPI: ExperimentApi = new ExperimentApi()
  public externalWebsitePAI: ExternalWebsitesApi = new ExternalWebsitesApi()
  public markdownAPI: MarkdownPagesApi = new MarkdownPagesApi()
  public apiKeyAPI: APIKeyApi
  private _apiKeyApiEndpoint: string
  public apiKey?: string

  constructor(
    generalApiUrl: string,
    tpsApiUrl: string,
    gpsApiUrl: string,
    gtpsApiUrl: string,
    apiKeyApiUrl: string,
    apiKey?: string,
    useArtificialDelay: boolean = true,
  ) {
    this._generalApiEndpoint = generalApiUrl;
    this._tpsApiEndpoint = tpsApiUrl;
    this._gpsApiEndpoint = gpsApiUrl
    this._gtpsApiEndpoint = gtpsApiUrl
    this._apiKeyApiEndpoint = apiKeyApiUrl
    if (!apiKey) {
      tryLoadAPIKeyFromLocalStorage()
      let supposedlyAKey = getAPIKey()
      if (supposedlyAKey) {
        this.apiKey = supposedlyAKey //Definitely a key
      }
    }
    this.apiKeyAPI = new APIKeyApi(
      new Configuration({
        basePath: this._apiKeyApiEndpoint,
      }),
    )
    this.resetConfig()
  }

  private _genConfig(url: string) {
    let config = new Configuration({
      basePath: url,
      middleware: [new APIKeyMiddleware()],
    })

    return config
  }

  public resetConfig() {
    this.generalApi = new GeneralApi(this._genConfig(this._generalApiEndpoint))
    this.tpsApi = new TPSApi(this._genConfig(this._tpsApiEndpoint))
    this.gpsApi = new GPSApi(this._genConfig(this._gpsApiEndpoint))
    this.gtpsApi = new GasAdjustedTPSApi(
      this._genConfig(this._gtpsApiEndpoint),
    )
    this.experimentAPI = new ExperimentApi(
      this._genConfig(this._generalApiEndpoint),
    )
    this.externalWebsitePAI = new ExternalWebsitesApi(this._genConfig(this._generalApiEndpoint))
    this.markdownAPI = new MarkdownPagesApi(this._genConfig(this._generalApiEndpoint))

    this.apiKeyAPI = new APIKeyApi(
      new Configuration({
        basePath: this._apiKeyApiEndpoint,
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

  public getLastMinuteData(dataType: DataType) {
    switch (dataType) {
      case DataType.TPS:
        return this.tpsApi.aPITPSGetGet({
          interval: "OneMinute",
        })
      case DataType.GPS:
        return this.gpsApi.aPIGPSGetGet({
          interval: "OneMinute",
        })
      default:
        return this.gtpsApi.aPIGasAdjustedTPSGetGet({
          interval: "OneMinute",
        })
    }
  }

  public getLinksForProvider(providerName?: string) {
    if (!providerName) {
      return Promise.reject()
    }
    return this.externalWebsitePAI.apiInfoExternalWebsitesGetExternalWebsitesForGet(
      {
        providerName,
      },
    )
  }

  public getMarkdownInfoPageFor(providerName?: string) {
    if (!providerName) {
      return Promise.reject()
    }
    return this.markdownAPI.apiInfoMarkdownPagesGetMarkdownPagesForGet({
      providerName,
    })
  }
}
