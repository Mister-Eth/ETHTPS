import { createConfiguration } from '../api-gen/configuration';
import { ServerConfiguration } from '../api-gen/servers';
import { GeneralApi } from '../api-gen/index'
export class ETHTPSApi {

    public generalApi: GeneralApi;

    private _variables: { [key: string]: any }
    constructor(url: string) {
        this._variables = {}
        let config = createConfiguration({
            baseServer: new ServerConfiguration(url, this._variables)
        })
        this.generalApi = new GeneralApi(config);
    }
    /*
    public _generalApi: GeneralApiRequestFactory
    private _client: HttpLibrary;

    constructor() {
        let config = createConfiguration();
        config.baseServer.
        this._generalApi = new GeneralApiRequestFactory(createConfiguration())
        this._generalApi.aPIV2ProvidersGet();
        this._client = new IsomorphicFetchHttpLibrary();
    }

    public getProviders(subchainsOf?: string, _options?: Configuration): Promise<[ProviderModel] | unknown> {
        return this._generalApi.aPIV2ProvidersGet(subchainsOf, _options).then(((value: RequestContext) => {
            return this._client.send(value).toPromise().then((responseContext: ResponseContext) => {
                return responseContext.getBodyAsAny() as [ProviderModel] | unknown
            })
        }).bind(this))
    }*/
}