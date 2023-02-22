/// <reference types="react" />
import { IL2DataResponseModel, DataType, IDataGetter, IL2DataRequestModel } from 'ethtps.data';
export declare const BACKGROUND = "#ffdede";
type L2Request = {
    [K in keyof IL2DataRequestModel]: IL2DataRequestModel[K];
} & {
    dataType: DataType;
};
export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
    providerHovered?: (name: string) => void;
    l2DataGetter?: IDataGetter<L2Request, IL2DataResponseModel>;
};
export declare function CustomVISXStreamgraph({ width, height, animate, l2DataGetter, }: StreamGraphProps): JSX.Element | null;
export {};
