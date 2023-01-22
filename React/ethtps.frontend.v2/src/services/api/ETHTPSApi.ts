import { createConfiguration } from "../api-gen/configuration";
import { ServerConfiguration } from "../api-gen/servers";
import { GeneralApi } from "../api-gen/index";
//import { DefaultOptions, QueryClientConfig, QueryObserverOptions, QueryOptions, useQueries, useQuery, QueryFunction } from 'react-query';
import { ProviderResponseModel } from "../api-gen/models/ProviderResponseModel";

export class ETHTPSApi {
  public generalApi: GeneralApi;

  private _variables: { [key: string]: any };
  constructor(url: string) {
    this._variables = {};
    let config = createConfiguration({
      baseServer: new ServerConfiguration(url, this._variables),
    });
    this.generalApi = new GeneralApi(config);
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

  public buildQueryClientConfig() {
    return {
      defaultOptions: {
        queries: {},
        //this.getProvidersQuery()
      },
    };
  }
}
