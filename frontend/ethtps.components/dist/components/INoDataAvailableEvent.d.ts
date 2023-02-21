import { ProviderModel } from 'ethtps.api.client';
export interface INoDataAvailableEvent {
    onNoDataAvailable?: (provider: ProviderModel | string) => void;
}
