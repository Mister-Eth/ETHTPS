import * as React from 'react';
export interface TabPanelProps {
    children?: React.ReactNode;
    index?: number;
    value?: number;
}
export declare function a11yProps(index: number): {
    id: string;
    'aria-controls': string;
};
