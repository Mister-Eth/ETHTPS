import { DatedXYDataPoint } from 'ethtps.api.client';
export declare const accentColor = "#f6acc8";
export declare const background = "#584153";
export declare const background2 = "#af8baf";
export type BrushProps = {
    dataPoints: DatedXYDataPoint[];
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    compact?: boolean;
};
export declare function BrushChart({ dataPoints, compact, width, height, margin, }: BrushProps): JSX.Element;
