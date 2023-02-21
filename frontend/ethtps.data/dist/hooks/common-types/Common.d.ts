import { Moment } from 'moment';
import { DataPoint, DataType } from 'ethtps.api.client';
import { DataResponseModelDictionary, InstantDataResponseModel } from './Dictionaries';
export declare function toShortString(type: DataType): string;
export declare function fromShortString(typeStr: string): DataType;
export declare const extractData: (dict?: any, providerName?: string | null) => number;
export declare const getModeData: (model: InstantDataResponseModel, mode: DataType) => DataResponseModelDictionary | undefined;
export type TV = {
    x: Moment;
    y: number;
};
export declare class TimeValue implements TV {
    x: Moment;
    y: number;
    constructor(p: DataPoint | undefined);
}
export declare class StringTimeValue {
    x: string;
    y: number;
    constructor(p: DataPoint | undefined);
}
export declare const appModeToUIFormat: (mode: DataType) => string;
export declare const shortTimeIntervalToUIFormat: (interval: string) => string;
export declare const inline: {
    className: string;
};
export declare function uniform<T>(size: T): {
    style: {
        width: T;
        height: T;
    };
};
export declare const numberFormat: (value?: number) => string | 0;
