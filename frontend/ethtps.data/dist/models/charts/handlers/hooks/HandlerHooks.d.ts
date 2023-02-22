import { IHandler } from '../IHandler';
export declare function createHandlerFromCallback<TReturnValue>(callback: (newValue?: TReturnValue) => void): Handler<TReturnValue> | undefined;
export declare function useHandler<TReturnValue>(handler?: IHandler<TReturnValue>): Handler<TReturnValue> | undefined;
export declare class Handler<TReturnValue> {
    setter: (newValue?: TReturnValue) => void;
    value?: TReturnValue | undefined;
    constructor(setter?: (newValue?: TReturnValue) => void, value?: TReturnValue | undefined);
    convertToIHandler(): IHandler<TReturnValue>;
}
