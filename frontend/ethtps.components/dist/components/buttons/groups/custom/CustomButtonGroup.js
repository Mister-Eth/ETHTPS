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
import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
export function CustomButtonGroup(params) {
    var _a;
    return (_jsx(React.Fragment, { children: _jsx(ButtonGroup, __assign({ variant: "contained", "aria-label": "outlined primary button group" }, { children: (_a = params === null || params === void 0 ? void 0 : params.buttons) === null || _a === void 0 ? void 0 : _a.map(function (x, i) { return (_jsx(Button, { children: x }, i)); }) })) }));
}
//# sourceMappingURL=CustomButtonGroup.js.map