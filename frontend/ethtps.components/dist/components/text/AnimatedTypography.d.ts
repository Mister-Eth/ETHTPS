interface IAnimatedTypographyConfiguration {
    child: JSX.Element | string;
    animationClassName: string;
    durationMs: number;
    standard?: any;
    centerText?: boolean;
}
export declare function AnimatedTypography(config: IAnimatedTypographyConfiguration): JSX.Element;
export {};
