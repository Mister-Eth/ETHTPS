import { IProviderModel } from "../interfaces/IProviderModel";
import { ETHTPSApi } from "../../services/api/ETHTPSApi";
import { DataPoint } from "../../services/api-gen";
import { IMaxDataModel } from "../interfaces/IMaxDataModel";
import { CustomDataPoint } from "../../Types";

export interface IApplicationState extends IMaxDataModel {
  providers?: IProviderModel[];
  networks?: string[];
  intervals?: string[];
  maxTPSData?: CustomDataPoint;
  maxGPSData?: CustomDataPoint;
  maxGTPSData?: CustomDataPoint;
}

export class ApplicationState implements IApplicationState {
  public providers?: IProviderModel[];
  public networks?: string[] | undefined;
  public intervals?: string[] | undefined;
  public maxTPSData?: CustomDataPoint;
  public maxGPSData?: CustomDataPoint;
  public maxGTPSData?: CustomDataPoint;

  constructor(state?: IApplicationState) {
    this.providers = state?.providers;
    this.networks = state?.networks;
    this.intervals = state?.intervals;
    this.maxTPSData = state?.maxTPSData;
    this.maxGPSData = state?.maxGPSData;
    this.maxGTPSData = state?.maxGTPSData;
  }
}
