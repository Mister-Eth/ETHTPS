import { DataType } from "ethtps.api.client"

export function ThrowInvalidDataTypeException(typeStr: string) {
  throw new TypeError(`Invalid DataType "${typeStr}"`)
}

export function ThrowConversionNotImplementedException(dataType?: DataType) {
  throw new TypeError(`Invalid DataType "${dataType}"`)
}
