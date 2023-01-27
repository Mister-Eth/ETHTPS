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
import { toShortString_2 } from "./models/TimeIntervals"

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

export const appModeToUIFormat = (mode: DataType): string => {
  switch (toShortString(mode).toUpperCase()) {
    case "TPS":
      return "Transactions per second"
    case "GPS":
      return "Gas per second"
    default:
      return "Gas-adjusted transactions per second"
  }
}

export const shortTimeIntervalToUIFormat = (interval: string): string => {
  switch (toShortString_2(interval).toUpperCase()) {
    case "1H":
      return "One hour"
    case "1M":
      return "One month"
    case "1D":
      return "One day"
    case "1W":
      return "One week"
    case "1MO":
      return "One month"
    case "1Y":
      return "One year"
    default:
      return "All-time"
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
