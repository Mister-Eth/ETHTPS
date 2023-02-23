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
export function SignatureFooter() {
    return (_jsx(React.Fragment, { children: _jsx("footer", __assign({ style: {
                fontSize: '13px',
                marginTop: '2rem',
                marginLeft: '2rem',
            } }, { children: _jsxs("div", __assign({ className: 'inline' }, { children: ["Brought to you by", _jsx("div", __assign({ style: { marginLeft: '5px' }, className: 'trick' }, { children: _jsx("span", { children: "Mister_Eth" }) })), _jsx("br", {}), "Donate:", _jsx("a", __assign({ style: { marginLeft: '5px' }, href: "https://app.ens.domains/name/ethtps.eth/details" }, { children: "ethtps.eth" })), _jsx("p", __assign({ className: 'ul-hover inline', style: { marginLeft: '5px' } }, { children: "(0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482)" }))] })) })) }));
}
//# sourceMappingURL=SignatureFooter.js.map