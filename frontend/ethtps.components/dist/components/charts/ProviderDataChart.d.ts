import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { INoDataAvailableEvent } from '../INoDataAvailableEvent';
interface IProviderDataChartConfiguration extends INoDataAvailableEvent {
    provider: string;
}
export declare function ProviderDataChart(config: IProviderDataChartConfiguration): JSX.Element;
export {};
