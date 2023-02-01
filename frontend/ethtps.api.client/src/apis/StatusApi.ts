/* tslint:disable */
/* eslint-disable */
/**
 * ETHTPS.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BlockInfoProviderStatusResult,
} from '../models';
import {
    BlockInfoProviderStatusResultFromJSON,
    BlockInfoProviderStatusResultToJSON,
} from '../models';

export interface ApiStatusGetBlockInfoProviderStatusGetRequest {
    provider?: string;
    network?: string;
    includeSidechains?: boolean;
    xAPIKey?: string;
}

/**
 * 
 */
export class StatusApi extends runtime.BaseAPI {

    /**
     */
    async apiStatusGetBlockInfoProviderStatusGetRaw(requestParameters: ApiStatusGetBlockInfoProviderStatusGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: BlockInfoProviderStatusResult; }>> {
        const queryParameters: any = {};

        if (requestParameters.provider !== undefined) {
            queryParameters['Provider'] = requestParameters.provider;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['Network'] = requestParameters.network;
        }

        if (requestParameters.includeSidechains !== undefined) {
            queryParameters['IncludeSidechains'] = requestParameters.includeSidechains;
        }

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Status/GetBlockInfoProviderStatus`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, BlockInfoProviderStatusResultFromJSON));
    }

    /**
     */
    async apiStatusGetBlockInfoProviderStatusGet(requestParameters: ApiStatusGetBlockInfoProviderStatusGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: BlockInfoProviderStatusResult; }> {
        const response = await this.apiStatusGetBlockInfoProviderStatusGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
