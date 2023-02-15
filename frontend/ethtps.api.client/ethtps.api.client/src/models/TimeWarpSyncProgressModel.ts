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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TimeWarpSyncProgressModel
 */
export interface TimeWarpSyncProgressModel {
    /**
     * 
     * @type {number}
     * @memberof TimeWarpSyncProgressModel
     */
    currentBlock?: number;
    /**
     * 
     * @type {number}
     * @memberof TimeWarpSyncProgressModel
     */
    latestBlockHeight?: number;
}

/**
 * Check if a given object implements the TimeWarpSyncProgressModel interface.
 */
export function instanceOfTimeWarpSyncProgressModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TimeWarpSyncProgressModelFromJSON(json: any): TimeWarpSyncProgressModel {
    return TimeWarpSyncProgressModelFromJSONTyped(json, false);
}

export function TimeWarpSyncProgressModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeWarpSyncProgressModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'currentBlock': !exists(json, 'currentBlock') ? undefined : json['currentBlock'],
        'latestBlockHeight': !exists(json, 'latestBlockHeight') ? undefined : json['latestBlockHeight'],
    };
}

export function TimeWarpSyncProgressModelToJSON(value?: TimeWarpSyncProgressModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'currentBlock': value.currentBlock,
        'latestBlockHeight': value.latestBlockHeight,
    };
}

