import { IProviderModel } from "../interfaces/IProviderModel"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"
import { DataPointDictionary, DataType } from "../../Types"
import { IDataModeModel } from "../interfaces/IDataModeModel"
import { ILiveDataModeModel } from "../interfaces/ILiveDataModeModel"
import { TimeInterval } from "../TimeIntervals"
import { DataPoint } from "../../services/api-gen"

export interface IApplicationState
  extends IMaxDataModel,
    IDataModeModel,
    ILiveDataModeModel {
  providers?: IProviderModel[]
  networks?: string[]
  intervals?: string[]
  maxTPSData?: DataPointDictionary
  maxGPSData?: DataPointDictionary
  maxGTPSData?: DataPointDictionary
  mode: DataType
  liveDataSmoothing: TimeInterval
  liveDataType: DataType
  getMaxDataFor(provider: string, type: DataType): DataPoint | undefined
}

export class ApplicationState implements IApplicationState {
  public providers?: IProviderModel[]
  public networks?: string[] | undefined
  public intervals?: string[] | undefined
  public mode: DataType
  public maxTPSData?: DataPointDictionary
  public maxGPSData?: DataPointDictionary
  public maxGTPSData?: DataPointDictionary
  public liveDataSmoothing: TimeInterval
  public liveDataType: DataType
  public getMaxDataFor(
    provider: string,
    type: DataType,
  ): DataPoint | undefined {
    return undefined
  }

  constructor(state?: IApplicationState) {
    this.providers = state?.providers
    this.networks = state?.networks
    this.intervals = state?.intervals
    this.maxTPSData = state?.maxTPSData
    this.maxGPSData = state?.maxGPSData
    this.maxGTPSData = state?.maxGTPSData
    this.mode = state?.mode ?? DataType.TPS
    this.liveDataSmoothing = state?.liveDataSmoothing ?? TimeInterval._1m
    this.liveDataType = state?.liveDataType ?? DataType.TPS
  }
}
