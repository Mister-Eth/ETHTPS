import { DataType } from "ethtps.api.client";
export declare enum TimeInterval {
    Instant = 0,
    _1m = 1,
    _1h = 2,
    _1d = 3,
    _1mo = 4,
    _1y_ = 5,
    All = 6,
    Other = 7
}
export declare function toShortString(interval: TimeInterval): "Instant" | "All" | "1d" | "1h" | "1m" | "1mo" | "1y" | "Other";
export declare function dataTypeToString(type: DataType): "TPS" | "GPS" | "GTPS";
export declare function toShortString_2(intervalName: string): string;
export declare function fromShortString_2(intervalName: string): string;
