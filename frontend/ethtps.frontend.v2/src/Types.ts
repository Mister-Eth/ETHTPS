import { Moment } from "moment"
import moment from "moment"
import React from "react"
import { SkeletonWithTooltip } from "./components/partials/SkeletonWithTooltip"
import { toShortString_2 } from "./models/TimeIntervals"
import { DataResponseModelDictionary } from "./Types.dictionaries"
import { ILiveDataModeModel } from "./models/interfaces/ILiveDataModeModel"
import { DataPoint, DataType } from "ethtps.api.client"

export function toShortString(type: DataType): string {
  switch (type) {
    case DataType.Tps:
      return "TPS"
    case DataType.Gps:
      return "GPS"
    case DataType.GasAdjustedTps:
      return "GTPS"
    default:
      return "Unknown"
  }
}

export function fromShortString(typeStr: string): DataType {
  switch (typeStr.toUpperCase()) {
    case "TPS":
      return DataType.Tps
    case "GPS":
      return DataType.Gps
    default:
      return DataType.GasAdjustedTps
  }
}

// Have to use any because it has a weird structure. Whose fault could it be?
export const extractData = (dict?: any, providerName?: string | null) => {
  if (dict && providerName && dict[providerName]) {
    if (dict[providerName].at(0)) {
      let q = dict[providerName].at(0)
      if (q) {
        let result = q.value
        return Math.round(result * 100) / 100
      }
    }
  }
  return 0
}

export const getModeData = (
  model: ILiveDataModeModel,
  mode: DataType,
): DataResponseModelDictionary | undefined => {
  switch (mode) {
    case DataType.Tps:
      return model.data?.tps
    case DataType.Gps:
      return model.data?.gps
    case DataType.GasAdjustedTps:
      return model.data?.gasAdjustedTPS
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

export class StringTimeValue {
  public x: string
  public y: number
  constructor(p: DataPoint | undefined) {
    this.x = p?.date?.toString() ?? ""
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
      return interval
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
  component?: JSX.Element,
  renderIf?: boolean,
) => {
  return renderIf ? component : React.createElement(SkeletonWithTooltip)
}

export const inline = {
  className: "inline",
}

export function uniform<T>(size: T) {
  return {
    style: {
      width: size,
      height: size,
    },
  }
}

export const numberFormat = (value?: number) => {
  if (!value) return 0
  if (value > 1000) value = Math.round(value)
  return (Math.round(value * 100) / 100).toLocaleString()
}

interface IconTypeProps {
  width: number
  height: number
  color: string
}

export type IconType = (props: IconTypeProps) => JSX.Element

export type DropdownOptionWithIcon<T> =
  | {
      value: T
      icon?: IconType
    }
  | undefined

export function createDropdownOptionWithIcon<T>(
  value: T,
  icon?: IconType,
): DropdownOptionWithIcon<T> {
  return {
    value,
    icon,
  }
}
