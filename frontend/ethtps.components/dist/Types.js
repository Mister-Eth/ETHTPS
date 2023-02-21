import React from 'react';
import { SkeletonWithTooltip } from './components/partials/skeletons/SkeletonWithTooltip';
export const ConditionalRender = (component, renderIf) => {
    return renderIf
        ? component
        : React.createElement('div', {
            className: 'placeholder',
        });
};
export const ConditionalSkeletonRender = (component, renderIf) => {
    return renderIf ? component : React.createElement(SkeletonWithTooltip);
};
export function createDropdownOptionWithIcon(value, icon) {
    return {
        value,
        icon,
    };
}
