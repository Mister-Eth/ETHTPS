import { DataType, TimeInterval } from "ethtps.api.client"

export function getLiveDataSmoothingFromQueryStringOrDefault(
  defaultValue: TimeInterval,
): TimeInterval {
  return defaultValue
}

export function getLiveDataTypeFromQueryStringOrDefault(
  defaultValue: DataType,
): DataType {
  return defaultValue
}

export function getIncludeSidechainsFromQueryStringOrDefault(
  defaultValue: boolean,
): boolean {
  return defaultValue
}
