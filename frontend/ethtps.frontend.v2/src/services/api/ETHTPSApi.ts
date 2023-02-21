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
	ChartDataApi,
	L2DataApi,
	ApiV3ChartDataGetStreamchartDataGetRequest,
	ApiV3ChartDataGetStackedChartDataGetRequest,
	ApiV3L2DataGetPostRequest,
	DataType,
} from 'ethtps.api.client'
import { tryLoadAPIKeyFromLocalStorage, getAPIKey } from '../DependenciesIOC'
import { APIKeyMiddleware } from './APIKeyMiddleware'
import {
	DataResponseModelDictionary,
	DataPointDictionary,
	StringDictionary,
} from 'ethtps.data'

export class ETHTPSApi {
	public generalApi: GeneralApi = new GeneralApi()
	private _apiURL: string
	public tpsApi: TPSApi = new TPSApi()
	public gpsApi: GPSApi = new GPSApi()
	public gtpsApi: GasAdjustedTPSApi = new GasAdjustedTPSApi()
	public experimentAPI: ExperimentApi = new ExperimentApi()
	public externalWebsitePAI: ExternalWebsitesApi = new ExternalWebsitesApi()
	public markdownAPI: MarkdownPagesApi = new MarkdownPagesApi()
	public chartDataAPI: ChartDataApi = new ChartDataApi()
	public l2DataAPI: L2DataApi = new L2DataApi()
	public apiKeyAPI: APIKeyApi
	public apiKey?: string

	constructor(apiURL: string, apiKey?: string) {
		this._apiURL = apiURL
		if (!apiKey) {
			tryLoadAPIKeyFromLocalStorage()
			let supposedlyAKey = getAPIKey()
			if (supposedlyAKey) {
				this.apiKey = supposedlyAKey //Definitely a key
			}
		}
		this.apiKeyAPI = new APIKeyApi(
			new Configuration({
				basePath: this._apiURL,
			})
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
		this.generalApi = new GeneralApi(this._genConfig(this._apiURL))
		this.tpsApi = new TPSApi(this._genConfig(this._apiURL))
		this.gpsApi = new GPSApi(this._genConfig(this._apiURL))
		this.gtpsApi = new GasAdjustedTPSApi(this._genConfig(this._apiURL))
		this.experimentAPI = new ExperimentApi(this._genConfig(this._apiURL))
		this.externalWebsitePAI = new ExternalWebsitesApi(
			this._genConfig(this._apiURL)
		)
		this.markdownAPI = new MarkdownPagesApi(this._genConfig(this._apiURL))

		this.apiKeyAPI = new APIKeyApi(
			new Configuration({
				basePath: this._apiURL,
			})
		)

		this.chartDataAPI = new ChartDataApi(this._genConfig(this._apiURL))
		this.l2DataAPI = new L2DataApi(this._genConfig(this._apiURL))
		/*
    this.statusAPI = new StatusApi(
      new Configuration({
        basePath: this._statusAPIEndpoint,
      }),
    )*/
	}

	public getProviders(): Promise<ProviderResponseModel[]> {
		return this.generalApi.apiV2ProvidersGet()
	}

	public getNetworks(): Promise<Array<string>> {
		return this.generalApi.apiV2NetworksGet()
	}

	public getIntervals(): Promise<string[]> {
		return this.generalApi.apiV2IntervalsGet()
	}

	public getData(
		dataType: DataType,
		interval: TimeInterval,
		provider?: string,
		network?: string,
		includeSidechains?: boolean
	): Promise<DataResponseModelDictionary> {
		switch (dataType) {
			case DataType.Tps:
				return this.tpsApi.apiV2TPSGetGet({
					provider,
					network,
					includeSidechains,
					interval,
				})
			case DataType.GasAdjustedTps:
				return this.gtpsApi.apiV2GasAdjustedTPSGetGet({
					provider,
					network,
					includeSidechains,
					interval,
				})
			case DataType.Gps:
				return this.gpsApi.apiV2GPSGetGet({
					provider,
					network,
					includeSidechains,
					interval,
				})
			default:
				throw TypeError('Invalid data type')
		}
	}

	public getMax(
		dataType: DataType,
		provider?: string,
		network?: string,
		includeSidechains?: boolean
	): Promise<DataPointDictionary> | undefined {
		switch (dataType) {
			case DataType.Tps:
				return this.tpsApi.apiV2TPSMaxGet({
					provider,
					network,
					includeSidechains,
				})
			case DataType.Gps:
				return this.gpsApi.apiV2GPSMaxGet({
					provider,
					network,
					includeSidechains,
				})
			case DataType.GasAdjustedTps:
				return this.gtpsApi.apiV2GasAdjustedTPSMaxGet({
					provider,
					network,
					includeSidechains,
				})
			default:
				return undefined
		}
	}

	public getInstantData(smoothing: TimeInterval) {
		return this.generalApi.apiV2InstantDataGet({
			includeSidechains: true,
			//toShortString_2(smoothing),
		})
	}

	public getNewAPIKey(humanityProof: string) {
		return this.apiKeyAPI.apiV3APIKeysRegisterNewKeyForProofGetNewKeyGet({
			humanityProof,
		})
	}

	public getProviderColorDictionary(): Promise<StringDictionary> {
		return this.generalApi.apiV2ColorDictionaryGet()
	}

	public getProviderTypeColorDictionary(): Promise<StringDictionary> {
		return this.generalApi.apiV2ProviderTypesColorDictionaryGet()
	}

	public getIntervalsWithData(provider: string) {
		return this.generalApi.apiV2GetIntervalsWithDataGet({ provider })
	}

	public getAvailableExperiments(deviceType: string) {
		return this.experimentAPI.apiV3ExperimentsGetAvailableExperimentsGet({
			deviceType,
		})
	}

	public getLastMinuteData(dataType: DataType) {
		switch (dataType) {
			case DataType.Tps:
				return this.tpsApi.apiV2TPSGetGet({
					interval: 'OneMinute',
				})
			case DataType.Gps:
				return this.gpsApi.apiV2GPSGetGet({
					interval: 'OneMinute',
				})
			default:
				return this.gtpsApi.apiV2GasAdjustedTPSGetGet({
					interval: 'OneMinute',
				})
		}
	}

	public getLinksForProvider(providerName?: string) {
		if (!providerName) {
			return Promise.reject()
		}
		return this.externalWebsitePAI.apiV3ExternalWebsitesGet({
			providerName,
		})
	}

	public getMarkdownInfoPageFor(providerName?: string) {
		if (!providerName) {
			return Promise.reject()
		}
		return this.markdownAPI.apiV3MarkdownPagesGetMarkdownPagesForGet({
			providerName,
		})
	}

	public getStreamChartData(
		requestParameters?: ApiV3ChartDataGetStreamchartDataGetRequest
	) {
		return this.chartDataAPI.apiV3ChartDataGetStreamchartDataGet(
			requestParameters
		)
	}

	public getStackedChartData(
		requestParameters: ApiV3ChartDataGetStackedChartDataGetRequest
	) {
		return this.chartDataAPI.apiV3ChartDataGetStackedChartDataGet(
			requestParameters
		)
	}
	public async getL2Data(request: ApiV3L2DataGetPostRequest) {
		return await this.l2DataAPI.apiV3L2DataGetPost(request)
	}
}
