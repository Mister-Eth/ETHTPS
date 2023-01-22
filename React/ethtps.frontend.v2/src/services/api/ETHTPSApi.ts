import { createConfiguration } from "../api-gen/configuration";
import { ServerConfiguration } from "../api-gen/servers";
import {
  GPSApi,
  GasAdjustedTPSApi,
  GeneralApi,
  TPSApi,
} from "../api-gen/index";
//import { DefaultOptions, QueryClientConfig, QueryObserverOptions, QueryOptions, useQueries, useQuery, QueryFunction } from 'react-query';
import { ProviderResponseModel } from "../api-gen/models/ProviderResponseModel";

export class ETHTPSApi {
  public generalApi: GeneralApi;
  public tpsApi: TPSApi;
  public gpsApi: GPSApi;
  public gtpsApi: GasAdjustedTPSApi;

  private _variables: { [key: string]: any };
  constructor(url: string) {
    this._variables = {};
    let config = createConfiguration({
      baseServer: new ServerConfiguration(url, this._variables),
    });
    this.generalApi = new GeneralApi(config);
    this.tpsApi = new TPSApi(config);
    this.gpsApi = new GPSApi(config);
    this.gtpsApi = new GasAdjustedTPSApi(config);
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
    type: string,
    interval: string,
    provider?: string,
    network?: string,
    includeSidechains?: boolean
  ) {
    switch (type.toUpperCase()) {
      case "GPS":
        return this.gpsApi.aPIGPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
      case "GTPS":
        return this.gtpsApi.aPIGasAdjustedTPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
      default:
        return this.tpsApi.aPITPSGetGet(
          provider,
          network,
          includeSidechains,
          interval
        );
    }
  }

  public getMax(
    type: string,
    provider?: string,
    network?: string,
    includeSidechains?: boolean
  ) {
    switch (type.toUpperCase()) {
      case "GPS":
        return this.gpsApi.aPIGPSMaxGet(provider, network, includeSidechains);
      case "GTPS":
        return this.gtpsApi.aPIGasAdjustedTPSMaxGet(
          provider,
          network,
          includeSidechains
        );
      default:
        return this.tpsApi.aPITPSMaxGet(provider, network, includeSidechains);
    }
  }

  public buildQueryClientConfig() {
    return {
      defaultOptions: {
        queries: {},
        //this.getProvidersQuery()
      },
    };
  }
}
