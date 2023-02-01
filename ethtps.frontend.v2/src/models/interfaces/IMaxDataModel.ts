import { DataType } from "../../Types"
import { DataPointDictionary } from "../../Types.dictionaries"
import { DataPoint } from "../../services/api-gen/models/DataPoint"

export interface IMaxDataModel {
  maxTPSData?: DataPointDictionary
  maxGPSData?: DataPointDictionary
  maxGTPSData?: DataPointDictionary
  getMaxDataFor(provider: string, type: DataType): DataPoint | undefined
}
