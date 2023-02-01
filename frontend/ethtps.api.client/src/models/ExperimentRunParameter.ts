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
import type { Experiment } from './Experiment';
import {
    ExperimentFromJSON,
    ExperimentFromJSONTyped,
    ExperimentToJSON,
} from './Experiment';

/**
 * 
 * @export
 * @interface ExperimentRunParameter
 */
export interface ExperimentRunParameter {
    /**
     * 
     * @type {number}
     * @memberof ExperimentRunParameter
     */
    id?: number;
    /**
     * 
     * @type {Date}
     * @memberof ExperimentRunParameter
     */
    startDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ExperimentRunParameter
     */
    endDate?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof ExperimentRunParameter
     */
    enabled?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ExperimentRunParameter
     */
    displayToNpeopleBeforeEnd?: number | null;
    /**
     * 
     * @type {number}
     * @memberof ExperimentRunParameter
     */
    considerFinishedAfterTimeoutSeconds?: number;
    /**
     * 
     * @type {number}
     * @memberof ExperimentRunParameter
     */
    enrollmentChance?: number | null;
    /**
     * 
     * @type {Array<Experiment>}
     * @memberof ExperimentRunParameter
     */
    readonly experiments?: Array<Experiment> | null;
}

/**
 * Check if a given object implements the ExperimentRunParameter interface.
 */
export function instanceOfExperimentRunParameter(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ExperimentRunParameterFromJSON(json: any): ExperimentRunParameter {
    return ExperimentRunParameterFromJSONTyped(json, false);
}

export function ExperimentRunParameterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExperimentRunParameter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'startDate': !exists(json, 'startDate') ? undefined : (json['startDate'] === null ? null : new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (json['endDate'] === null ? null : new Date(json['endDate'])),
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'displayToNpeopleBeforeEnd': !exists(json, 'displayToNpeopleBeforeEnd') ? undefined : json['displayToNpeopleBeforeEnd'],
        'considerFinishedAfterTimeoutSeconds': !exists(json, 'considerFinishedAfterTimeoutSeconds') ? undefined : json['considerFinishedAfterTimeoutSeconds'],
        'enrollmentChance': !exists(json, 'enrollmentChance') ? undefined : json['enrollmentChance'],
        'experiments': !exists(json, 'experiments') ? undefined : (json['experiments'] === null ? null : (json['experiments'] as Array<any>).map(ExperimentFromJSON)),
    };
}

export function ExperimentRunParameterToJSON(value?: ExperimentRunParameter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'startDate': value.startDate === undefined ? undefined : (value.startDate === null ? null : value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate === null ? null : value.endDate.toISOString()),
        'enabled': value.enabled,
        'displayToNpeopleBeforeEnd': value.displayToNpeopleBeforeEnd,
        'considerFinishedAfterTimeoutSeconds': value.considerFinishedAfterTimeoutSeconds,
        'enrollmentChance': value.enrollmentChance,
    };
}

