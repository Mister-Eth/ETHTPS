import { IIntervalChangedHandler, IL2DataRequestHandler, IL2DataResponseModel, IModeChangedHandler, INetworkChangedHandler } from 'ethtps.data';
import { IProviderDataChartConfiguration } from './IProviderDataChartConfiguration';
import { IOptionalCallback } from 'ethtps.data';
export interface IChartConfigurationModel {
    provider?: IProviderDataChartConfiguration;
    request?: IL2DataRequestHandler;
    mode?: IModeChangedHandler;
    interval?: IIntervalChangedHandler;
    network?: INetworkChangedHandler;
    data?: IL2DataResponseModel;
    onNoDataAvailable: IOptionalCallback<string | undefined>;
}
