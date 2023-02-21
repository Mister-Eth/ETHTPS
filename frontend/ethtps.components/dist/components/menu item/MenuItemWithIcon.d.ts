import React from 'react';
interface IButtonProperties {
    image: JSX.Element;
    text: string;
    href: string;
    openInNewTab: boolean;
    myKey: React.Key;
    onMouseOverCapture?: () => void;
}
export declare function MenuItemWithIcon(props: IButtonProperties): JSX.Element;
export {};
