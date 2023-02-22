/// <reference types="react" />
import { IHandler } from 'ethtps.data';
interface IIntervalDropdownProperties {
    changed?: IHandler<string>;
}
export declare function IntervalDropdown(config: IIntervalDropdownProperties): JSX.Element;
export {};
