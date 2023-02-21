/* tslint:disable */
/* eslint-disable */
/**
 * ETHTPS.info API
 * Backend definition for ethtps.info; you\'re free to play around
 *
 * The version of the OpenAPI document: v3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { DataType } from './DataType';
import {
    DataTypeFromJSON,
    DataTypeFromJSONTyped,
    DataTypeToJSON,
} from './DataType';
import type { Dataset } from './Dataset';
import {
    DatasetFromJSON,
    DatasetFromJSONTyped,
    DatasetToJSON,
} from './Dataset';
import type { SimpleMultiDatasetAnalysis } from './SimpleMultiDatasetAnalysis';
import {
    SimpleMultiDatasetAnalysisFromJSON,
    SimpleMultiDatasetAnalysisFromJSONTyped,
    SimpleMultiDatasetAnalysisToJSON,
} from './SimpleMultiDatasetAnalysis';

/**
 * 
 * @export
 * @interface L2DataResponseModel
 */
export interface L2DataResponseModel {
    /**
     * 
     * @type {Dataset}
     * @memberof L2DataResponseModel
     */
    data?: Dataset;
    /**
     * 
     * @type {Array<Dataset>}
     * @memberof L2DataResponseModel
     */
    datasets?: Array<Dataset> | null;
    /**
     * 
     * @type {SimpleMultiDatasetAnalysis}
     * @memberof L2DataResponseModel
     */
    simpleAnalysis?: SimpleMultiDatasetAnalysis;
    /**
     * 
     * @type {DataType}
     * @memberof L2DataResponseModel
     */
    dataType?: DataType;
}

/**
 * Check if a given object implements the L2DataResponseModel interface.
 */
export function instanceOfL2DataResponseModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function L2DataResponseModelFromJSON(json: any): L2DataResponseModel {
    return L2DataResponseModelFromJSONTyped(json, false);
}

export function L2DataResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): L2DataResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : DatasetFromJSON(json['data']),
        'datasets': !exists(json, 'datasets') ? undefined : (json['datasets'] === null ? null : (json['datasets'] as Array<any>).map(DatasetFromJSON)),
        'simpleAnalysis': !exists(json, 'simpleAnalysis') ? undefined : SimpleMultiDatasetAnalysisFromJSON(json['simpleAnalysis']),
        'dataType': !exists(json, 'dataType') ? undefined : DataTypeFromJSON(json['dataType']),
    };
}

export function L2DataResponseModelToJSON(value?: L2DataResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': DatasetToJSON(value.data),
        'datasets': value.datasets === undefined ? undefined : (value.datasets === null ? null : (value.datasets as Array<any>).map(DatasetToJSON)),
        'simpleAnalysis': SimpleMultiDatasetAnalysisToJSON(value.simpleAnalysis),
        'dataType': DataTypeToJSON(value.dataType),
    };
}
