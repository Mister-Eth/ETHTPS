import React from 'react';
import { SkeletonWithTooltip } from './components/partials/skeletons/SkeletonWithTooltip';
export var ConditionalRender = function (component, renderIf) {
    return renderIf
        ? component
        : React.createElement('div', {
            className: 'placeholder',
        });
};
export var ConditionalSkeletonRender = function (component, renderIf) {
    return renderIf ? component : React.createElement(SkeletonWithTooltip);
};
export function createDropdownOptionWithIcon(value, icon) {
    return {
        value: value,
        icon: icon,
    };
}
//# sourceMappingURL=Types.js.map