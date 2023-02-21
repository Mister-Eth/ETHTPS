import { IMaxDataModel } from "../interfaces/IMaxDataModel";
import { IDataModeModel } from "../interfaces/IDataModeModel";
import { ILiveDataModeModel } from "../interfaces/ILiveDataModeModel";
import { ProviderResponseModel } from "ethtps.api.client";
import { WebsocketSubscriptionState } from "src/slices/WebsocketSubscriptionSlice";
import { IColorDictionaries } from "../interfaces/IColorDictionaries";
import { IDataLoadingModel } from "../interfaces/IDataLoadingModel";
import { IMainPageModel } from "../interfaces/IMainPageModel";
import { IPagesState } from "../IPagesState";
export interface IApplicationState {
    websockets?: WebsocketSubscriptionState;
    colorDictionaries?: IColorDictionaries;
    dataLoading?: IDataLoadingModel;
    dataMode?: IDataModeModel;
    liveData?: ILiveDataModeModel;
    mainPage?: IMainPageModel;
    maxData?: IMaxDataModel;
    experiments?: number[];
    intervals?: Array<string>;
    networks?: Array<string>;
    providers?: ProviderResponseModel[];
    pages: IPagesState;
}
export declare class ApplicationState implements IApplicationState {
    websockets?: WebsocketSubscriptionState;
    colorDictionaries?: IColorDictionaries;
    dataLoading?: IDataLoadingModel;
    dataMode?: IDataModeModel;
    liveData?: ILiveDataModeModel;
    mainPage?: IMainPageModel;
    maxData?: IMaxDataModel;
    experiments?: number[];
    intervals?: Array<string>;
    networks?: Array<string>;
    providers?: ProviderResponseModel[];
    pages: {
        mainPage: IMainPageModel;
    };
    constructor(websockets?: WebsocketSubscriptionState, colorDictionaries?: IColorDictionaries, dataLoading?: IDataLoadingModel, dataMode?: IDataModeModel, liveData?: ILiveDataModeModel, mainPage?: IMainPageModel, maxData?: IMaxDataModel, experiments?: number[], intervals?: Array<string>, networks?: Array<string>, providers?: ProviderResponseModel[], pages?: {
        mainPage: IMainPageModel;
    });
}
