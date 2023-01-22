import { IProviderModel } from "../interfaces/IProviderModel";
import { ETHTPSApi } from "../../services/api/ETHTPSApi";

export interface IApplicationState {
  providers?: IProviderModel[];
  networks?: string[];
  intervals?: string[];
}

export class ApplicationState implements IApplicationState {
  public providers?: IProviderModel[];
  public networks?: string[] | undefined;
  public intervals?: string[] | undefined;

  constructor(state?: IApplicationState) {
    this.providers = state?.providers;
    this.networks = state?.networks;
    this.intervals = state?.intervals;
  }
}
