"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureFooter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function SignatureFooter() {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("footer", Object.assign({ style: {
                fontSize: '13px',
                marginTop: '2rem',
                marginLeft: '2rem',
            } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'inline' }, { children: ["Brought to you by", (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginLeft: '5px' }, className: 'trick' }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Mister_Eth" }) })), (0, jsx_runtime_1.jsx)("br", {}), "Donate:", (0, jsx_runtime_1.jsx)("a", Object.assign({ style: { marginLeft: '5px' }, href: "https://app.ens.domains/name/ethtps.eth/details" }, { children: "ethtps.eth" })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'ul-hover inline', style: { marginLeft: '5px' } }, { children: "(0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482)" }))] })) })) }));
}
exports.SignatureFooter = SignatureFooter;
