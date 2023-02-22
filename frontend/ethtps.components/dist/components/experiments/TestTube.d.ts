/// <reference types="react" />
import { IRequestHandler } from 'ethtps.data';
export declare function TestTube(request: IRequestHandler<{
    isDesktop: boolean;
}, number[]>, params: {
    isDesktop: boolean;
}): Promise<JSX.Element>;
