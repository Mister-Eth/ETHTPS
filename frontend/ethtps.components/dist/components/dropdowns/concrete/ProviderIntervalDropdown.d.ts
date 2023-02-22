/// <reference types="react" />
import { IHandler, IRequestHandler } from 'ethtps.data';
import { IDropdownConfig } from '../types/IDropdownConfig';
import { IDropdownCallbackWithProvider } from '../types/IDropdownCallbackWithProvider';
import { IOptionalCallback } from 'ethtps.data';
interface IProviderIntervalDropdownConfig extends IDropdownCallbackWithProvider<string>, IDropdownConfig<string> {
    loader?: IRequestHandler<void, string[]>;
    availableIntervals?: IHandler<string[]>;
    noDataAvailable?: IOptionalCallback<string>;
}
export declare function ProviderIntervalDropdown(config: IProviderIntervalDropdownConfig): JSX.Element;
export {};
