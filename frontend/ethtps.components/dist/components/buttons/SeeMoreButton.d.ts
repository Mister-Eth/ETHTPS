/// <reference types="react" />
interface ISeeMoreButtonProps {
    onSeeMore?: () => void;
    onSeeLess?: () => void;
    enabled: boolean;
}
export declare function SeeMoreButton(events: ISeeMoreButtonProps): JSX.Element;
export {};
