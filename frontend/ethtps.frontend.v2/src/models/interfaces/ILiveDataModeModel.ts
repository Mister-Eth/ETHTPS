import { DataType } from "../../Types"
import { TimeInterval } from "../TimeIntervals"
import {
  DataResponseModelDictionary,
  InstantDataResponseModel,
} from "../../Types.dictionaries"

export interface ILiveDataModeModel {
  liveDataSmoothing: TimeInterval
  liveDataType: DataType
  includeSidechains: boolean
  data?: InstantDataResponseModel
  oneMinuteTPSData?: DataResponseModelDictionary
  oneMinuteGPSData?: DataResponseModelDictionary
  oneMinuteGTPSData?: DataResponseModelDictionary
}
