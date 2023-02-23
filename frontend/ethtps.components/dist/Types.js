"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDropdownOptionWithIcon = exports.ConditionalSkeletonRender = exports.ConditionalRender = void 0;
const react_1 = __importDefault(require("react"));
const SkeletonWithTooltip_1 = require("./components/partials/skeletons/SkeletonWithTooltip");
const ConditionalRender = (component, renderIf) => {
    return renderIf
        ? component
        : react_1.default.createElement('div', {
            className: 'placeholder',
        });
};
exports.ConditionalRender = ConditionalRender;
const ConditionalSkeletonRender = (component, renderIf) => {
    return renderIf ? component : react_1.default.createElement(SkeletonWithTooltip_1.SkeletonWithTooltip);
};
exports.ConditionalSkeletonRender = ConditionalSkeletonRender;
function createDropdownOptionWithIcon(value, icon) {
    return {
        value,
        icon,
    };
}
exports.createDropdownOptionWithIcon = createDropdownOptionWithIcon;
