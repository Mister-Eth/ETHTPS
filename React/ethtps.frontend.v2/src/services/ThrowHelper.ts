export function ThrowInvalidDataTypeException(typeStr: string) {
  throw new TypeError(`Invalid DataType \"${typeStr}\"`);
}

export function ThrowConversionNotImplementedException<T>(dataType: T) {
  throw new TypeError(`Invalid DataType \"${dataType}\"`);
}
