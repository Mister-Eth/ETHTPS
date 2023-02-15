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
import type { Group } from './Group';
import {
    GroupFromJSON,
    GroupFromJSONTyped,
    GroupToJSON,
} from './Group';
import type { Role } from './Role';
import {
    RoleFromJSON,
    RoleFromJSONTyped,
    RoleToJSON,
} from './Role';

/**
 * 
 * @export
 * @interface GroupRole
 */
export interface GroupRole {
    /**
     * 
     * @type {number}
     * @memberof GroupRole
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof GroupRole
     */
    groupId?: number;
    /**
     * 
     * @type {number}
     * @memberof GroupRole
     */
    roleId?: number;
    /**
     * 
     * @type {Group}
     * @memberof GroupRole
     */
    group?: Group;
    /**
     * 
     * @type {Role}
     * @memberof GroupRole
     */
    role?: Role;
}

/**
 * Check if a given object implements the GroupRole interface.
 */
export function instanceOfGroupRole(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GroupRoleFromJSON(json: any): GroupRole {
    return GroupRoleFromJSONTyped(json, false);
}

export function GroupRoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupRole {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'groupId': !exists(json, 'groupId') ? undefined : json['groupId'],
        'roleId': !exists(json, 'roleId') ? undefined : json['roleId'],
        'group': !exists(json, 'group') ? undefined : GroupFromJSON(json['group']),
        'role': !exists(json, 'role') ? undefined : RoleFromJSON(json['role']),
    };
}

export function GroupRoleToJSON(value?: GroupRole | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'groupId': value.groupId,
        'roleId': value.roleId,
        'group': GroupToJSON(value.group),
        'role': RoleToJSON(value.role),
    };
}

