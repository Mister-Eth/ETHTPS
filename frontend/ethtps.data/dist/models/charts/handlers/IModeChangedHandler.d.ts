import { DataType } from 'ethtps.api.client';
export interface IModeChangedHandler {
    defaultMode?: DataType;
    modeChangedCallback?: (mode: DataType) => void;
}
