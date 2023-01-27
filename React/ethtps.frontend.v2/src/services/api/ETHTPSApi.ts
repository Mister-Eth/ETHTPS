import { createConfiguration } from "../api-gen/configuration"
import { ServerConfiguration } from "../api-gen/servers"
import { GPSApi, GasAdjustedTPSApi, GeneralApi, TPSApi } from "../api-gen/index"
import { ProviderResponseModel } from "../api-gen/models/ProviderResponseModel"
import { DataType, DataPointDictionary, StringDictionary } from "../../Types"

export class ETHTPSApi {
  public generalApi: GeneralApi
  public tpsApi: TPSApi
  public gpsApi: GPSApi
  public gtpsApi: GasAdjustedTPSApi

  private _variables: { [key: string]: any }

  constructor(url?: string, useArtificialDelay: boolean = true) {
    this._variables = {}
    url ??= ""
    let config = createConfiguration({
      baseServer: new ServerConfiguration(url, this._variables),
    })
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
  ) {
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

  public getProviderColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ColorDictionaryGet()
  }

  public getProviderTypeColorDictionary(): Promise<StringDictionary> {
    return this.generalApi.aPIV2ProviderTypesColorDictionaryGet()
  }
}
