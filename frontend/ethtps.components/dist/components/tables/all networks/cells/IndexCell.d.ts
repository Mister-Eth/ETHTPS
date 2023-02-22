/// <reference types="react" />
import { ICustomCellConfiguration } from './ICustomCellConfiguration';
interface IIndexCellConfiguration extends ICustomCellConfiguration {
    index: number;
    showTick?: boolean;
}
export declare function IndexCell(config: IIndexCellConfiguration): JSX.Element;
export {};
