export interface IIncludeSidechainsChangedHandler {
    defaultValue?: boolean;
    includeSidechainsChangedCallback?: (value: boolean) => void;
}
