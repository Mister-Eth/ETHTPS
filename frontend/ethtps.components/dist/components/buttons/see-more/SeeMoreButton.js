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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import React from 'react';
export function SeeMoreButton(events) {
    var _a = useState(true), expand = _a[0], setExpand = _a[1];
    var onClick = function () {
        if (expand) {
            if (events.onSeeMore !== undefined) {
                events.onSeeMore();
            }
        }
        else {
            if (events.onSeeLess !== undefined) {
                events.onSeeLess();
            }
        }
        setExpand(!expand);
    };
    var getIcon = function () { return (expand ? _jsx(ArrowDownward, {}) : _jsx(ArrowUpward, {})); };
    return (_jsx(React.Fragment, { children: _jsxs(Button, __assign({ disabled: !events.enabled, variant: "text", sx: {
                width: '100%',
            }, startIcon: getIcon(), endIcon: getIcon(), onClick: function () { return onClick(); } }, { children: ["See ", expand ? 'more' : 'less'] })) }));
}
//# sourceMappingURL=SeeMoreButton.js.map