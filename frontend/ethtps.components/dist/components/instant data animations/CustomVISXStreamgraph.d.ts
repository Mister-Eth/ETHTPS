export declare const BACKGROUND = "#ffdede";
export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
    providerHovered?: (name: string) => void;
};
export declare function CustomVISXStreamgraph({ width, height, animate, }: StreamGraphProps): JSX.Element | null;
