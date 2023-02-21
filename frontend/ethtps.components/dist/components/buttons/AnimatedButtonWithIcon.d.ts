/// <reference types="react" />
interface IButtonProperties {
    image: JSX.Element;
    text: string;
    href: string;
    showText?: boolean;
    openInNewTab: boolean;
}
export declare function AnimatedLinkButtonWithIcon(props: IButtonProperties): JSX.Element;
export {};
