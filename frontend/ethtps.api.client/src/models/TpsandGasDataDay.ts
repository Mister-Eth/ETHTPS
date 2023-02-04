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
import type { Network } from './Network';
import {
    NetworkFromJSON,
    NetworkFromJSONTyped,
    NetworkToJSON,
} from './Network';
import type { Provider } from './Provider';
import {
    ProviderFromJSON,
    ProviderFromJSONTyped,
    ProviderToJSON,
} from './Provider';

/**
 * 
 * @export
 * @interface TpsandGasDataDay
 */
export interface TpsandGasDataDay {
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    network?: number;
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    provider?: number;
    /**
     * 
     * @type {Network}
     * @memberof TpsandGasDataDay
     */
    networkNavigation?: Network;
    /**
     * 
     * @type {Provider}
     * @memberof TpsandGasDataDay
     */
    providerNavigation?: Provider;
    /**
     * 
     * @type {Date}
     * @memberof TpsandGasDataDay
     */
    startDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    averageTps?: number;
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    averageGps?: number;
    /**
     * 
     * @type {number}
     * @memberof TpsandGasDataDay
     */
    readingsCount?: number;
    /**
     * 
     * @type {string}
     * @memberof TpsandGasDataDay
     */
    oclhJson?: string | null;
}

/**
 * Check if a given object implements the TpsandGasDataDay interface.
 */
export function instanceOfTpsandGasDataDay(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TpsandGasDataDayFromJSON(json: any): TpsandGasDataDay {
    return TpsandGasDataDayFromJSONTyped(json, false);
}

export function TpsandGasDataDayFromJSONTyped(json: any, ignoreDiscriminator: boolean): TpsandGasDataDay {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'network': !exists(json, 'network') ? undefined : json['network'],
        'provider': !exists(json, 'provider') ? undefined : json['provider'],
        'networkNavigation': !exists(json, 'networkNavigation') ? undefined : NetworkFromJSON(json['networkNavigation']),
        'providerNavigation': !exists(json, 'providerNavigation') ? undefined : ProviderFromJSON(json['providerNavigation']),
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'averageTps': !exists(json, 'averageTps') ? undefined : json['averageTps'],
        'averageGps': !exists(json, 'averageGps') ? undefined : json['averageGps'],
        'readingsCount': !exists(json, 'readingsCount') ? undefined : json['readingsCount'],
        'oclhJson': !exists(json, 'oclhJson') ? undefined : json['oclhJson'],
    };
}

export function TpsandGasDataDayToJSON(value?: TpsandGasDataDay | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'network': value.network,
        'provider': value.provider,
        'networkNavigation': NetworkToJSON(value.networkNavigation),
        'providerNavigation': ProviderToJSON(value.providerNavigation),
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString()),
        'averageTps': value.averageTps,
        'averageGps': value.averageGps,
        'readingsCount': value.readingsCount,
        'oclhJson': value.oclhJson,
    };
}
