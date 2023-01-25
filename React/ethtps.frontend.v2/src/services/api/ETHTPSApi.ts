import { Configuration, createConfiguration } from "../api-gen/configuration";
import { ServerConfiguration } from "../api-gen/servers";
import {
  GPSApi,
  GasAdjustedTPSApi,
  GeneralApi,
  TPSApi,
} from "../api-gen/index";
//import { DefaultOptions, QueryClientConfig, QueryObserverOptions, QueryOptions, useQueries, useQuery, QueryFunction } from 'react-query';
import { ProviderResponseModel } from "../api-gen/models/ProviderResponseModel";
import { randomShortSleeper } from "../PromiseSleeper";
import { DataType, toShortString, DataPointDictionary } from "../../Types";
import { DataPoint } from "../api-gen/models/DataPoint";
import {
  ThrowConversionNotImplementedException,
  ThrowInvalidDataTypeException,
} from "../ThrowHelper";

export class ETHTPSApi {
  public generalApi: GeneralApi;
  public tpsApi: TPSApi;
  public gpsApi: GPSApi;
  public gtpsApi: GasAdjustedTPSApi;

  private _variables: { [key: string]: any };
  private _sleeperDelay: number;

  constructor(url: string, useArtificialDelay: boolean = true) {
    this._variables = {};
    let config = createConfiguration({
      baseServer: new ServerConfiguration(url, this._variables),
    });
    this.generalApi = new GeneralApi(config);
    this.tpsApi = new TPSApi(config);
    this.gpsApi = new GPSApi(config);
    this.gtpsApi = new GasAdjustedTPSApi(config);
    this._sleeperDelay = useArtificialDelay ? 1000 : 0;
  }

  public getProviders(): Promise<ProviderResponseModel[]> {
    return this.generalApi.aPIV2ProvidersGet();
  }

  public getNetworks(): Promise<Array<string>> {
    return this.generalApi.aPIV2NetworksGet();
  }

  public getIntervals(): Promise<string[]> {
    return this.generalApi.aPIV2IntervalsGet();
  }

  public getData(
    type: DataType,
    interval: string,
    provider?: string,
    network?: string,
    includeSidechains?: boolean
  ) {
    switch (type) {
      case DataType.GPS:
        return this.gpsApi.aPIGPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
      case DataType.TPS:
        return this.tpsApi.aPITPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
      default:
        ThrowConversionNotImplementedException(type);
        return;
    }
  }

  public getMax(
    dataType: DataType,
    provider?: string,
    network?: string,
    includeSidechains?: boolean
  ): Promise<DataPointDictionary> | undefined {
    switch (dataType) {
      case DataType.TPS:
        return this.tpsApi.aPITPSMaxGet(provider, network, includeSidechains);
      case DataType.GPS:
        return this.gpsApi.aPIGPSMaxGet(provider, network, includeSidechains);
      case DataType.GTPS:
        return this.gtpsApi.aPIGasAdjustedTPSMaxGet(
          provider,
          network,
          includeSidechains
        );
      default:
        ThrowConversionNotImplementedException(dataType);
    }
  }
}
