/// <reference types="react" />
interface ISidechainToggleButtonConfiguration {
    toggled?: (on: boolean) => void;
    defaultIncluded?: boolean;
}
export declare function SidechainToggleButton(config: ISidechainToggleButtonConfiguration): JSX.Element;
export {};
