import { IDropdownCallbackWithProvider } from './IDropdownCallbackWithProvider';
import { IDropdownConfig } from './IDropdownConfig';
import { INoDataAvailableEvent } from '../INoDataAvailableEvent';
interface IProviderIntervalDropdownConfig extends IDropdownCallbackWithProvider<string>, IDropdownConfig<string>, INoDataAvailableEvent {
    onDataLoaded?: (availableIntervals: string[]) => void;
}
export declare function ProviderIntervalDropdown(config: IProviderIntervalDropdownConfig): JSX.Element;
export {};
