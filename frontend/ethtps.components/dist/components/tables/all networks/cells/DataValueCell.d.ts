import { ICustomCellConfiguration } from './ICustomCellConfiguration';
import '../../cells.styles.css';
import { DataType } from 'ethtps.api.client';
interface IDataValueCellConficuration extends ICustomCellConfiguration {
    value?: number;
    dataType: DataType;
}
export declare function DataValueCell(config: IDataValueCellConficuration): JSX.Element;
export {};
