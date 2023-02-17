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
import type { Network } from './Network';
import {
    NetworkFromJSON,
    NetworkFromJSONTyped,
    NetworkToJSON,
} from './Network';

/**
 * 
 * @export
 * @interface StarkwareTransactionCountDatum
 */
export interface StarkwareTransactionCountDatum {
    /**
     * 
     * @type {number}
     * @memberof StarkwareTransactionCountDatum
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof StarkwareTransactionCountDatum
     */
    network?: number;
    /**
     * 
     * @type {string}
     * @memberof StarkwareTransactionCountDatum
     */
    product?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof StarkwareTransactionCountDatum
     */
    lastUpdateTime?: Date;
    /**
     * 
     * @type {number}
     * @memberof StarkwareTransactionCountDatum
     */
    lastUpdateCount?: number;
    /**
     * 
     * @type {number}
     * @memberof StarkwareTransactionCountDatum
     */
    lastUpdateTps?: number;
    /**
     * 
     * @type {Network}
     * @memberof StarkwareTransactionCountDatum
     */
    networkNavigation?: Network;
}

/**
 * Check if a given object implements the StarkwareTransactionCountDatum interface.
 */
export function instanceOfStarkwareTransactionCountDatum(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StarkwareTransactionCountDatumFromJSON(json: any): StarkwareTransactionCountDatum {
    return StarkwareTransactionCountDatumFromJSONTyped(json, false);
}

export function StarkwareTransactionCountDatumFromJSONTyped(json: any, ignoreDiscriminator: boolean): StarkwareTransactionCountDatum {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'network': !exists(json, 'network') ? undefined : json['network'],
        'product': !exists(json, 'product') ? undefined : json['product'],
        'lastUpdateTime': !exists(json, 'lastUpdateTime') ? undefined : (new Date(json['lastUpdateTime'])),
        'lastUpdateCount': !exists(json, 'lastUpdateCount') ? undefined : json['lastUpdateCount'],
        'lastUpdateTps': !exists(json, 'lastUpdateTps') ? undefined : json['lastUpdateTps'],
        'networkNavigation': !exists(json, 'networkNavigation') ? undefined : NetworkFromJSON(json['networkNavigation']),
    };
}

export function StarkwareTransactionCountDatumToJSON(value?: StarkwareTransactionCountDatum | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'network': value.network,
        'product': value.product,
        'lastUpdateTime': value.lastUpdateTime === undefined ? undefined : (value.lastUpdateTime.toISOString()),
        'lastUpdateCount': value.lastUpdateCount,
        'lastUpdateTps': value.lastUpdateTps,
        'networkNavigation': NetworkToJSON(value.networkNavigation),
    };
}

