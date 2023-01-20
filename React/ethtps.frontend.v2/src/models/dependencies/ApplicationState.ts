import { IProviderModel } from "../interfaces/IProviderModel";
import { ETHTPSApi } from '../../services/api/ETHTPSApi';

export interface IApplicationState {
    providers?: IProviderModel[]
}

export class ApplicationState implements IApplicationState {
    public providers?: IProviderModel[]

    constructor(providers?: IProviderModel[]) {
        this.providers = providers
    }
}