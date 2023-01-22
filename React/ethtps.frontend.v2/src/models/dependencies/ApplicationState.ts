import { IProviderModel } from "../interfaces/IProviderModel";
import { ETHTPSApi } from "../../services/api/ETHTPSApi";
import { DataPoint } from "../../services/api-gen";

export interface IApplicationState {
  providers?: IProviderModel[];
  networks?: string[];
  intervals?: string[];
  maxTPSData?: { [key: string]: DataPoint };
  maxGPSData?: { [key: string]: DataPoint };
  maxGTPSData?: { [key: string]: DataPoint };
}

export class ApplicationState implements IApplicationState {
  public providers?: IProviderModel[];
  public networks?: string[] | undefined;
  public intervals?: string[] | undefined;
  public maxTPSData?: { [key: string]: DataPoint };
  public maxGPSData?: { [key: string]: DataPoint };
  public maxGTPSData?: { [key: string]: DataPoint };

  constructor(state?: IApplicationState) {
    this.providers = state?.providers;
    this.networks = state?.networks;
    this.intervals = state?.intervals;
    this.maxTPSData = state?.maxTPSData;
    this.maxGPSData = state?.maxGPSData;
    this.maxGTPSData = state?.maxGTPSData;
  }
}
