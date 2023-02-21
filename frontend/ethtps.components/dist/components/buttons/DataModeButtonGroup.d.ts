/// <reference types="react" />
import { DataType } from 'ethtps.data';
interface IDataModeButtonGroupConfiguration {
    modeChanged: (mode: DataType) => void;
}
export declare function DataModeButtonGroup(model: IDataModeButtonGroupConfiguration): JSX.Element;
export {};
