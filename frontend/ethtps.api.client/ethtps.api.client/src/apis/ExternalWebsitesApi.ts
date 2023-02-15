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
  IExternalWebsite,
  IProviderExternalWebsite,
} from '../models';
import {
    IExternalWebsiteFromJSON,
    IExternalWebsiteToJSON,
    IProviderExternalWebsiteFromJSON,
    IProviderExternalWebsiteToJSON,
} from '../models';

export interface ApiInfoExternalWebsitesCreatePutRequest {
    xAPIKey?: string;
    iExternalWebsite?: IExternalWebsite;
}

export interface ApiInfoExternalWebsitesDeleteByIdPutRequest {
    id?: number;
    xAPIKey?: string;
}

export interface ApiInfoExternalWebsitesGetAllGetRequest {
    xAPIKey?: string;
}

export interface ApiInfoExternalWebsitesGetByIdGetRequest {
    id?: number;
    xAPIKey?: string;
}

export interface ApiInfoExternalWebsitesGetExternalWebsitesForGetRequest {
    providerName?: string;
    xAPIKey?: string;
}

export interface ApiInfoExternalWebsitesUpdatePutRequest {
    xAPIKey?: string;
    iExternalWebsite?: IExternalWebsite;
}

/**
 * 
 */
export class ExternalWebsitesApi extends runtime.BaseAPI {

    /**
     */
    async apiInfoExternalWebsitesCreatePutRaw(requestParameters: ApiInfoExternalWebsitesCreatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        const response = await this.request({
            path: `/api/info/external-websites/Create`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: IExternalWebsiteToJSON(requestParameters.iExternalWebsite),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiInfoExternalWebsitesCreatePut(requestParameters: ApiInfoExternalWebsitesCreatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiInfoExternalWebsitesCreatePutRaw(requestParameters, initOverrides);
    }

    /**
     */
    async apiInfoExternalWebsitesDeleteByIdPutRaw(requestParameters: ApiInfoExternalWebsitesDeleteByIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/info/external-websites/DeleteById`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiInfoExternalWebsitesDeleteByIdPut(requestParameters: ApiInfoExternalWebsitesDeleteByIdPutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiInfoExternalWebsitesDeleteByIdPutRaw(requestParameters, initOverrides);
    }

    /**
     */
    async apiInfoExternalWebsitesGetAllGetRaw(requestParameters: ApiInfoExternalWebsitesGetAllGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IExternalWebsite>>> {
        const queryParameters: any = {};

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/info/external-websites/GetAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IExternalWebsiteFromJSON));
    }

    /**
     */
    async apiInfoExternalWebsitesGetAllGet(requestParameters: ApiInfoExternalWebsitesGetAllGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IExternalWebsite>> {
        const response = await this.apiInfoExternalWebsitesGetAllGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiInfoExternalWebsitesGetByIdGetRaw(requestParameters: ApiInfoExternalWebsitesGetByIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<IExternalWebsite>> {
        const queryParameters: any = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/info/external-websites/GetById`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => IExternalWebsiteFromJSON(jsonValue));
    }

    /**
     */
    async apiInfoExternalWebsitesGetByIdGet(requestParameters: ApiInfoExternalWebsitesGetByIdGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<IExternalWebsite> {
        const response = await this.apiInfoExternalWebsitesGetByIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiInfoExternalWebsitesGetExternalWebsitesForGetRaw(requestParameters: ApiInfoExternalWebsitesGetExternalWebsitesForGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IProviderExternalWebsite>>> {
        const queryParameters: any = {};

        if (requestParameters.providerName !== undefined) {
            queryParameters['providerName'] = requestParameters.providerName;
        }

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/info/external-websites/GetExternalWebsitesFor`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IProviderExternalWebsiteFromJSON));
    }

    /**
     */
    async apiInfoExternalWebsitesGetExternalWebsitesForGet(requestParameters: ApiInfoExternalWebsitesGetExternalWebsitesForGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IProviderExternalWebsite>> {
        const response = await this.apiInfoExternalWebsitesGetExternalWebsitesForGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiInfoExternalWebsitesUpdatePutRaw(requestParameters: ApiInfoExternalWebsitesUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        const response = await this.request({
            path: `/api/info/external-websites/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: IExternalWebsiteToJSON(requestParameters.iExternalWebsite),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async apiInfoExternalWebsitesUpdatePut(requestParameters: ApiInfoExternalWebsitesUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.apiInfoExternalWebsitesUpdatePutRaw(requestParameters, initOverrides);
    }

}
