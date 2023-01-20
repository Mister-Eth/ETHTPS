import { IProviderModel } from "../interfaces/IProviderModel";

export interface IApplicationState {
    providers?: IProviderModel[]
}

export class ApplicationState implements IApplicationState {
    public providers?: IProviderModel[]
}