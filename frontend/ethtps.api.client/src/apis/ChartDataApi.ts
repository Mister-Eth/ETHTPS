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
  StackedChartModel,
  StreamchartModel,
} from '../models';
import {
    StackedChartModelFromJSON,
    StackedChartModelToJSON,
    StreamchartModelFromJSON,
    StreamchartModelToJSON,
} from '../models';

export interface ApiChartDataGetStackedChartDataGetRequest {
    interval?: string;
    dataType?: string;
    xAPIKey?: string;
}

export interface ApiChartDataGetStreamchartDataGetRequest {
    provider?: string;
    network?: string;
    includeSidechains?: boolean;
    xAPIKey?: string;
    interval?: string;
    count?: number;
}

/**
 * 
 */
export class ChartDataApi extends runtime.BaseAPI {

    /**
     */
    async apiChartDataGetStackedChartDataGetRaw(requestParameters: ApiChartDataGetStackedChartDataGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StackedChartModel>> {
        const queryParameters: any = {};

        if (requestParameters.interval !== undefined) {
            queryParameters['interval'] = requestParameters.interval;
        }

        if (requestParameters.dataType !== undefined) {
            queryParameters['dataType'] = requestParameters.dataType;
        }

        if (requestParameters.xAPIKey !== undefined) {
            queryParameters['XAPIKey'] = requestParameters.xAPIKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/ChartData/GetStackedChartData`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StackedChartModelFromJSON(jsonValue));
    }

    /**
     */
    async apiChartDataGetStackedChartDataGet(requestParameters: ApiChartDataGetStackedChartDataGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StackedChartModel> {
        const response = await this.apiChartDataGetStackedChartDataGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiChartDataGetStreamchartDataGetRaw(requestParameters: ApiChartDataGetStreamchartDataGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StreamchartModel>> {
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

        if (requestParameters.interval !== undefined) {
            queryParameters['interval'] = requestParameters.interval;
        }

        if (requestParameters.count !== undefined) {
            queryParameters['count'] = requestParameters.count;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/ChartData/GetStreamchartData`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StreamchartModelFromJSON(jsonValue));
    }

    /**
     */
    async apiChartDataGetStreamchartDataGet(requestParameters: ApiChartDataGetStreamchartDataGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StreamchartModel> {
        const response = await this.apiChartDataGetStreamchartDataGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
