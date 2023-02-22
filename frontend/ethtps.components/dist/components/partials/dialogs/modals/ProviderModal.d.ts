/// <reference types="react" />
import { INoDataAvailableEvent } from '../../../INoDataAvailableEvent';
import { ProviderModel } from 'ethtps.api.client';
interface IProviderModalConfiguration extends INoDataAvailableEvent {
    open: boolean;
    provider?: ProviderModel;
    onClose: () => void;
}
export declare function ProviderModal(config: IProviderModalConfiguration): JSX.Element;
export {};
