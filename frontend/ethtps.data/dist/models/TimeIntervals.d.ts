import { DataType, TimeInterval } from 'ethtps.api.client';
export declare function toShortString(interval: TimeInterval): "Instant" | "All" | "1d" | "1h" | "1m" | "1mo" | "1y" | "Other";
export declare function dataTypeToString(type: DataType): "TPS" | "GPS" | "GTPS";
export declare function toShortString_2(intervalName: string): string;
export declare function fromShortString_2(intervalName: string): string;
