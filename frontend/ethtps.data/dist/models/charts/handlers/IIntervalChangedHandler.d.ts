export interface IIntervalChangedHandler {
    defaultInterval?: string;
    intervalChangedCallback?: (interval: string) => void;
}
