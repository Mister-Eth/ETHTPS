import { IHandler } from '../IHandler';
export declare function useHandler<TReturnValue>(handler?: IHandler<TReturnValue>): Handler<TReturnValue> | undefined;
export type Handler<TReturnValue> = {
    setter: (newValue?: TReturnValue) => void;
    value?: TReturnValue | undefined;
};
