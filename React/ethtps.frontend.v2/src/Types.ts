import {
  ThrowConversionNotImplementedException,
  ThrowInvalidDataTypeException,
} from "./services/ThrowHelper";
import { DataPoint } from "./services/api-gen";

export type DataPointDictionary = { [key: string]: DataPoint };

export enum DataType {
  TPS,
  GPS,
  GTPS,
  Unknown,
}

export function toShortString(type: DataType): string {
  switch (type) {
    case DataType.TPS:
      return "TPS";
    case DataType.GPS:
      return "GPS";
    case DataType.GTPS:
      return "GTPS";
    default:
      ThrowConversionNotImplementedException(type);
      return "Unknown";
  }
}

export function fromShortString(typeStr: string): DataType {
  switch (typeStr.toUpperCase()) {
    case "TPS":
      return DataType.TPS;
    case "GPS":
      return DataType.GPS;
    case "GTPS":
      return DataType.GTPS;
    default:
      ThrowInvalidDataTypeException(typeStr);
      return DataType.Unknown;
  }
}
