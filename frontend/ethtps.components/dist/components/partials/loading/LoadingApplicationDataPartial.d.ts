import { PropsWithChildren } from 'react';
type Loadee = {
    loaded: boolean;
};
export declare function LoadingApplicationDataPartial({ children, ...props }: PropsWithChildren, loadees: Loadee[]): JSX.Element;
export {};
