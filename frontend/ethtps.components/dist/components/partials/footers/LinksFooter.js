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
export function LinksFooter() {
    return (_jsxs(React.Fragment, { children: [_jsxs("div", __assign({ className: "bottomnavbar" }, { children: [_jsx("a", __assign({ href: "/Status" }, { children: "Status" })), _jsx("div", { className: 'inline', style: { marginRight: '10px' } }), _jsx("a", __assign({ href: "https://api.ethtps.info/API/v2/AllData" }, { children: "Download data" }))] })), _jsx("hr", {})] }));
}
//# sourceMappingURL=LinksFooter.js.map