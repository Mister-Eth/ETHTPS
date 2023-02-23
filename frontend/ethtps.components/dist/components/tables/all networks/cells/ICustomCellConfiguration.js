"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClassNames = void 0;
const buildClassNames = (config) => {
    return {
        className: `inline ${config.clickCallback !== undefined ? 'pointable' : ''}`,
    };
};
exports.buildClassNames = buildClassNames;
