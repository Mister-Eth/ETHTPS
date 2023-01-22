import { DataPoint } from "../../services/api-gen";

export interface IMaxDataModel {
  maxTPSData?: { [key: string]: DataPoint };
  maxGPSData?: { [key: string]: DataPoint };
  maxGTPSData?: { [key: string]: DataPoint };
}
