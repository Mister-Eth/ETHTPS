/// <reference types="react" />
export declare const background = "#f3f3f3";
export type ThresholdProps = {
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
};
export declare function ThresholdChart({ width, height, margin, }: ThresholdProps): JSX.Element;
