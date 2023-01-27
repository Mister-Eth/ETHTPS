import { DataResponseModelDictionary, DataType } from "../../Types"
import { TimeInterval } from "../TimeIntervals"

export interface ILiveDataModeModel {
  liveDataSmoothing: TimeInterval
  liveDataType: DataType
  data?: DataResponseModelDictionary
}
