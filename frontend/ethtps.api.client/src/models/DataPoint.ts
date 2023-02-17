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
/**
 * 
 * @export
 * @interface DataPoint
 */
export interface DataPoint {
    /**
     * 
     * @type {Date}
     * @memberof DataPoint
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof DataPoint
     */
    value?: number;
    /**
     * 
     * @type {number}
     * @memberof DataPoint
     */
    blockNumber?: number | null;
}

/**
 * Check if a given object implements the DataPoint interface.
 */
export function instanceOfDataPoint(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DataPointFromJSON(json: any): DataPoint {
    return DataPointFromJSONTyped(json, false);
}

export function DataPointFromJSONTyped(json: any, ignoreDiscriminator: boolean): DataPoint {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
        'value': !exists(json, 'value') ? undefined : json['value'],
        'blockNumber': !exists(json, 'blockNumber') ? undefined : json['blockNumber'],
    };
}

export function DataPointToJSON(value?: DataPoint | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': value.date === undefined ? undefined : (value.date.toISOString()),
        'value': value.value,
        'blockNumber': value.blockNumber,
    };
}

