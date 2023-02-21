/// <reference types="react" />
export declare const ConditionalRender: (component: JSX.Element, renderIf?: boolean) => JSX.Element;
export declare const ConditionalSkeletonRender: (component?: JSX.Element, renderIf?: boolean) => JSX.Element | undefined;
interface IconTypeProps {
    width: number;
    height: number;
    color: string;
}
export type IconType = (props: IconTypeProps) => JSX.Element;
export type DropdownOptionWithIcon<T> = {
    value: T;
    icon?: IconType;
} | undefined;
export declare function createDropdownOptionWithIcon<T>(value: T, icon?: IconType): DropdownOptionWithIcon<T>;
export {};
