import { DataPoint, DataType } from "ethtps.api.client";
import { DataPointDictionary } from "../../Types.dictionaries";

export interface IMaxDataModel {
  maxTPSData?: DataPointDictionary;
  maxGPSData?: DataPointDictionary;
  maxGTPSData?: DataPointDictionary;
  getMaxDataFor(provider: string, type: DataType): DataPoint | undefined;
}
