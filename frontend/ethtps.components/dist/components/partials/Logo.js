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
import React from 'react';
import { Link } from 'react-router-dom';
export function Logo() {
    return (_jsx(React.Fragment, { children: _jsxs(Link, __assign({ style: {
                textDecoration: 'none',
            }, to: "/" }, { children: [_jsx("br", {}), _jsx("div", __assign({ className: 'jumpy unselectable', style: {
                        fontSize: 30,
                        display: 'inline',
                    } }, { children: "ETHTPS.info" }))] })) }));
}
//# sourceMappingURL=Logo.js.map