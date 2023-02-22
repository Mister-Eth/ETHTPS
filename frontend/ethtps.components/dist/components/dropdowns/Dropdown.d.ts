import { IDropdownCallback } from './IDropdownCallback';
interface IDropdownConfiguration<T> extends IDropdownCallback<T> {
    options: string[];
    hidden?: boolean;
    defaultOption?: string;
    hoverText?: string | JSX.Element;
    openOnHover?: boolean;
    enabled?: boolean;
    selectionChanged?: (value: T) => void;
    conversionFunction(value: string): T;
    uiFormatFunction?: (value: T) => string;
}
export declare function Dropdown<T>(configuration: IDropdownConfiguration<T>): JSX.Element;
export {};
