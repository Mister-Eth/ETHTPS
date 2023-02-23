/// <reference types="react" />
import { L2DataResponseModel, DataType, IDataGetter, L2DataRequestModel } from 'ethtps.data';
export declare const BACKGROUND = "#ffdede";
type L2Request = {
    [K in keyof L2DataRequestModel]: L2DataRequestModel[K];
} & {
    dataType: DataType;
};
export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
    providerHovered?: (name: string) => void;
    l2DataGetter?: IDataGetter<L2Request, L2DataResponseModel>;
};
export declare function CustomVISXStreamgraph({ width, height, animate, l2DataGetter, }: StreamGraphProps): JSX.Element | null;
export {};
