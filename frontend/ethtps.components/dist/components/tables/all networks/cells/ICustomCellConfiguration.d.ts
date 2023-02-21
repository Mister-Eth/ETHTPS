import { ICellClickedEvent } from './ICellClickedEvent';
import { ProviderResponseModel } from 'ethtps.api.client';
export declare const buildClassNames: (config: ICustomCellConfiguration) => {
    className: string;
};
export interface ICustomCellConfiguration extends ICellClickedEvent {
    provider?: ProviderResponseModel;
}
