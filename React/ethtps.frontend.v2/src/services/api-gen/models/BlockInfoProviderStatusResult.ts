/**
 * ETHTPS.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { BlockInfoProviderStatus } from "./BlockInfoProviderStatus"

export class BlockInfoProviderStatusResult {
  "status"?: BlockInfoProviderStatus
  "details"?: string

  static readonly discriminator: string | undefined = undefined

  static readonly attributeTypeMap: Array<{
    name: string
    baseName: string
    type: string
    format: string
  }> = [
    {
      name: "status",
      baseName: "status",
      type: "BlockInfoProviderStatus",
      format: "",
    },
    {
      name: "details",
      baseName: "details",
      type: "string",
      format: "",
    },
  ]

  static getAttributeTypeMap() {
    return BlockInfoProviderStatusResult.attributeTypeMap
  }
}
