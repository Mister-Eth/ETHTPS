import { DataPointDictionary, DataType } from "../../Types"
import { TimeInterval } from "../TimeIntervals"

export interface ILiveDataModeModel {
  liveDataSmoothing: TimeInterval
  liveDataType: DataType
  data?: DataPointDictionary
}
