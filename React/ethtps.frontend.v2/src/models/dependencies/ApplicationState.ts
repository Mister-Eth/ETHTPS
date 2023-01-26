import { IProviderModel } from "../interfaces/IProviderModel"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"
import { DataPointDictionary, DataType } from "../../Types"
import { IDataModeModel } from "../interfaces/IDataModeModel"

export interface IApplicationState extends IMaxDataModel, IDataModeModel {
  providers?: IProviderModel[]
  networks?: string[]
  intervals?: string[]
  maxTPSData?: DataPointDictionary
  maxGPSData?: DataPointDictionary
  maxGTPSData?: DataPointDictionary
  mode: DataType
}

export class ApplicationState implements IApplicationState {
  public providers?: IProviderModel[]
  public networks?: string[] | undefined
  public intervals?: string[] | undefined
  public mode: DataType
  public maxTPSData?: DataPointDictionary
  public maxGPSData?: DataPointDictionary
  public maxGTPSData?: DataPointDictionary

  constructor(state?: IApplicationState) {
    this.providers = state?.providers
    this.networks = state?.networks
    this.intervals = state?.intervals
    this.maxTPSData = state?.maxTPSData
    this.maxGPSData = state?.maxGPSData
    this.maxGTPSData = state?.maxGTPSData
    this.mode = state?.mode ?? DataType.Unknown
  }
}
