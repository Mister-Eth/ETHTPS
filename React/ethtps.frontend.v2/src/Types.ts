import { Moment } from "moment"
import {
  ThrowConversionNotImplementedException,
  ThrowInvalidDataTypeException,
} from "./services/ThrowHelper"
import { DataPoint } from "./services/api-gen/models/DataPoint"
import moment from "moment"
import { DataResponseModel } from "./services/api-gen"
import React from "react"
import { SkeletonWithTooltip } from "./components/partials/SkeletonWithTooltip"

export type DataPointDictionary = { [key: string]: DataPoint }

export type DataResponseModelDictionary = { [key: string]: DataResponseModel[] }

export type StringDictionary = { [key: string]: string }

export type AnyDictionary = { [key: string]: any }

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

export const ConditionalRender = (
  component: JSX.Element,
  renderIf?: boolean,
) => {
  return renderIf
    ? component
    : React.createElement("div", {
        className: "placeholder",
      })
}

export const ConditionalSkeletonRender = (
  component: JSX.Element,
  renderIf?: boolean,
) => {
  return renderIf ? component : React.createElement(SkeletonWithTooltip)
}
