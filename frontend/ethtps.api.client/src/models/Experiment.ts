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
import type { ApikeyExperimentBinding } from './ApikeyExperimentBinding';
import {
    ApikeyExperimentBindingFromJSON,
    ApikeyExperimentBindingFromJSONTyped,
    ApikeyExperimentBindingToJSON,
} from './ApikeyExperimentBinding';
import type { ExperimentFeedback } from './ExperimentFeedback';
import {
    ExperimentFeedbackFromJSON,
    ExperimentFeedbackFromJSONTyped,
    ExperimentFeedbackToJSON,
} from './ExperimentFeedback';
import type { ExperimentResult } from './ExperimentResult';
import {
    ExperimentResultFromJSON,
    ExperimentResultFromJSONTyped,
    ExperimentResultToJSON,
} from './ExperimentResult';
import type { ExperimentRunParameter } from './ExperimentRunParameter';
import {
    ExperimentRunParameterFromJSON,
    ExperimentRunParameterFromJSONTyped,
    ExperimentRunParameterToJSON,
} from './ExperimentRunParameter';
import type { ExperimentTarget } from './ExperimentTarget';
import {
    ExperimentTargetFromJSON,
    ExperimentTargetFromJSONTyped,
    ExperimentTargetToJSON,
} from './ExperimentTarget';
import type { ExperimentalSession } from './ExperimentalSession';
import {
    ExperimentalSessionFromJSON,
    ExperimentalSessionFromJSONTyped,
    ExperimentalSessionToJSON,
} from './ExperimentalSession';
import type { Provider } from './Provider';
import {
    ProviderFromJSON,
    ProviderFromJSONTyped,
    ProviderToJSON,
} from './Provider';

/**
 * 
 * @export
 * @interface Experiment
 */
export interface Experiment {
    /**
     * 
     * @type {number}
     * @memberof Experiment
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof Experiment
     */
    projectId?: number;
    /**
     * 
     * @type {string}
     * @memberof Experiment
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Experiment
     */
    description?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Experiment
     */
    target?: number;
    /**
     * 
     * @type {number}
     * @memberof Experiment
     */
    runParameters?: number;
    /**
     * 
     * @type {Array<ApikeyExperimentBinding>}
     * @memberof Experiment
     */
    readonly apikeyExperimentBindings?: Array<ApikeyExperimentBinding> | null;
    /**
     * 
     * @type {Array<ExperimentFeedback>}
     * @memberof Experiment
     */
    readonly experimentFeedbacks?: Array<ExperimentFeedback> | null;
    /**
     * 
     * @type {Array<ExperimentResult>}
     * @memberof Experiment
     */
    readonly experimentResults?: Array<ExperimentResult> | null;
    /**
     * 
     * @type {ExperimentalSession}
     * @memberof Experiment
     */
    experimentalSession?: ExperimentalSession;
    /**
     * 
     * @type {Provider}
     * @memberof Experiment
     */
    project?: Provider;
    /**
     * 
     * @type {ExperimentRunParameter}
     * @memberof Experiment
     */
    runParametersNavigation?: ExperimentRunParameter;
    /**
     * 
     * @type {ExperimentTarget}
     * @memberof Experiment
     */
    targetNavigation?: ExperimentTarget;
}

/**
 * Check if a given object implements the Experiment interface.
 */
export function instanceOfExperiment(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ExperimentFromJSON(json: any): Experiment {
    return ExperimentFromJSONTyped(json, false);
}

export function ExperimentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Experiment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'projectId': !exists(json, 'projectId') ? undefined : json['projectId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'target': !exists(json, 'target') ? undefined : json['target'],
        'runParameters': !exists(json, 'runParameters') ? undefined : json['runParameters'],
        'apikeyExperimentBindings': !exists(json, 'apikeyExperimentBindings') ? undefined : (json['apikeyExperimentBindings'] === null ? null : (json['apikeyExperimentBindings'] as Array<any>).map(ApikeyExperimentBindingFromJSON)),
        'experimentFeedbacks': !exists(json, 'experimentFeedbacks') ? undefined : (json['experimentFeedbacks'] === null ? null : (json['experimentFeedbacks'] as Array<any>).map(ExperimentFeedbackFromJSON)),
        'experimentResults': !exists(json, 'experimentResults') ? undefined : (json['experimentResults'] === null ? null : (json['experimentResults'] as Array<any>).map(ExperimentResultFromJSON)),
        'experimentalSession': !exists(json, 'experimentalSession') ? undefined : ExperimentalSessionFromJSON(json['experimentalSession']),
        'project': !exists(json, 'project') ? undefined : ProviderFromJSON(json['project']),
        'runParametersNavigation': !exists(json, 'runParametersNavigation') ? undefined : ExperimentRunParameterFromJSON(json['runParametersNavigation']),
        'targetNavigation': !exists(json, 'targetNavigation') ? undefined : ExperimentTargetFromJSON(json['targetNavigation']),
    };
}

export function ExperimentToJSON(value?: Experiment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'projectId': value.projectId,
        'name': value.name,
        'description': value.description,
        'target': value.target,
        'runParameters': value.runParameters,
        'experimentalSession': ExperimentalSessionToJSON(value.experimentalSession),
        'project': ProviderToJSON(value.project),
        'runParametersNavigation': ExperimentRunParameterToJSON(value.runParametersNavigation),
        'targetNavigation': ExperimentTargetToJSON(value.targetNavigation),
    };
}

