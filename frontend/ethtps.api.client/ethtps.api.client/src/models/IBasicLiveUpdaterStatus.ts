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
 * @interface IBasicLiveUpdaterStatus
 */
export interface IBasicLiveUpdaterStatus {
    /**
     * 
     * @type {string}
     * @memberof IBasicLiveUpdaterStatus
     */
    readonly status?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof IBasicLiveUpdaterStatus
     */
    readonly isUnreliable?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof IBasicLiveUpdaterStatus
     */
    readonly isProbablyDown?: boolean;
}

/**
 * Check if a given object implements the IBasicLiveUpdaterStatus interface.
 */
export function instanceOfIBasicLiveUpdaterStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function IBasicLiveUpdaterStatusFromJSON(json: any): IBasicLiveUpdaterStatus {
    return IBasicLiveUpdaterStatusFromJSONTyped(json, false);
}

export function IBasicLiveUpdaterStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): IBasicLiveUpdaterStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': !exists(json, 'status') ? undefined : json['status'],
        'isUnreliable': !exists(json, 'isUnreliable') ? undefined : json['isUnreliable'],
        'isProbablyDown': !exists(json, 'isProbablyDown') ? undefined : json['isProbablyDown'],
    };
}

export function IBasicLiveUpdaterStatusToJSON(value?: IBasicLiveUpdaterStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}

