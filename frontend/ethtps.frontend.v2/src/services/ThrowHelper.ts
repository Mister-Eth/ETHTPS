import { DataType } from "./api-gen/models/DataType"

export function ThrowInvalidDataTypeException(typeStr: string) {
  throw new TypeError(`Invalid DataType "${typeStr}"`)
}

export function ThrowConversionNotImplementedException(dataType?: DataType) {
  throw new TypeError(`Invalid DataType "${dataType}"`)
}
