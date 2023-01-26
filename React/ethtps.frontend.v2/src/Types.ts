import { Moment } from "moment"
import {
  ThrowConversionNotImplementedException,
  ThrowInvalidDataTypeException,
} from "./services/ThrowHelper"
import { DataPoint } from "./services/api-gen/models/DataPoint"
import moment from "moment"

export type DataPointDictionary = { [key: string]: DataPoint }

export type StringDictionary = { [key: string]: string }

export enum DataType {
  TPS,
  GPS,
  GTPS,
  Unknown,
}

export function toShortString(type: DataType): string {
  switch (type) {
    case DataType.TPS:
      return "TPS"
    case DataType.GPS:
      return "GPS"
    case DataType.GTPS:
      return "GTPS"
    default:
      ThrowConversionNotImplementedException()
      return "Unknown"
  }
}

export function fromShortString(typeStr: string): DataType {
  switch (typeStr.toUpperCase()) {
    case "TPS":
      return DataType.TPS
    case "GPS":
      return DataType.GPS
    case "GTPS":
      return DataType.GTPS
    default:
      ThrowInvalidDataTypeException(typeStr)
      return DataType.Unknown
  }
}

export type TV = { x: Moment; y: number }

export class TimeValue implements TV {
  public x: Moment
  public y: number

  constructor(p: DataPoint | undefined) {
    this.x = moment(p?.date)
    this.y = p?.value ?? 0
  }
}
