var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { CustomButtonGroup } from './groups/custom/CustomButtonGroup';
export function ModeButton() {
    return (_jsx(React.Fragment, { children: _jsx(CustomButtonGroup, __assign({}, { buttons: ['TPS', 'GPS', 'GTPS'] })) }));
}
//# sourceMappingURL=ModeButton.js.map