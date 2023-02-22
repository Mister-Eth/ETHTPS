import React from 'react';
import { AxisScale } from '@visx/axis';
export default function AreaChart({ data, gradientColor, width, yMax, margin, xScale, yScale, hideBottomAxis, hideLeftAxis, top, left, children, }: {
    data: {
        x: Date;
        y: number;
    }[];
    gradientColor: string;
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    width: number;
    yMax: number;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    top?: number;
    left?: number;
    children?: React.ReactNode;
}): JSX.Element | null;
