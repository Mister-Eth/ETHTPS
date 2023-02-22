import { IIntervalChangedHandler, IL2DataRequestHandler, IModeChangedHandler, INetworkChangedHandler } from 'ethtps.data';
import { IProviderDataChartConfiguration } from './IProviderDataChartConfiguration';
export interface IChartConfigurationModel extends IProviderDataChartConfiguration, IL2DataRequestHandler, IModeChangedHandler, IIntervalChangedHandler, INetworkChangedHandler {
}
