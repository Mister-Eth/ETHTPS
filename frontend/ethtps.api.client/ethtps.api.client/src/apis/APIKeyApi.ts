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
  APIKeyResponseModel,
} from '../models';
import {
    APIKeyResponseModelFromJSON,
    APIKeyResponseModelToJSON,
} from '../models';

export interface ApiAPIKeyGetNewKeyGetRequest {
    humanityProof?: string;
}

/**
 * 
 */
export class APIKeyApi extends runtime.BaseAPI {

    /**
     */
    async apiAPIKeyGetNewKeyGetRaw(requestParameters: ApiAPIKeyGetNewKeyGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<APIKeyResponseModel>> {
        const queryParameters: any = {};

        if (requestParameters.humanityProof !== undefined) {
            queryParameters['humanityProof'] = requestParameters.humanityProof;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/APIKey/GetNewKey`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => APIKeyResponseModelFromJSON(jsonValue));
    }

    /**
     */
    async apiAPIKeyGetNewKeyGet(requestParameters: ApiAPIKeyGetNewKeyGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<APIKeyResponseModel> {
        const response = await this.apiAPIKeyGetNewKeyGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
