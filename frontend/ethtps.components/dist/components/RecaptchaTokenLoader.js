"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaTokenLoader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = require("react");
const Types_1 = require("../Types");
const react_google_invisible_recaptcha_1 = __importDefault(require("react-google-invisible-recaptcha"));
const LoadingApplicationDataPartial_1 = require("./partials/loading/LoadingApplicationDataPartial");
const react_2 = __importDefault(require("react"));
const react_3 = require("react");
function RecaptchaTokenLoader(props) {
    var _a;
    const [ready, setReady] = (0, react_3.useState)(JSON.parse((_a = localStorage.getItem('XAPIKey')) !== null && _a !== void 0 ? _a : 'false'));
    const refRecaptcha = (0, react_1.createRef)();
    const handleHumanArrived = () => {
        var _a, _b, _c, _d, _e;
        const tokenData = (_a = refRecaptcha.current) === null || _a === void 0 ? void 0 : _a.callbacks.getResponse();
        if ((_b = props.onKeyLoaded) === null || _b === void 0 ? void 0 : _b.callback) {
            (_c = props.onKeyLoaded) === null || _c === void 0 ? void 0 : _c.callback(tokenData);
            if ((_d = props.onIsHuman) === null || _d === void 0 ? void 0 : _d.callback)
                (_e = props.onIsHuman) === null || _e === void 0 ? void 0 : _e.callback(true);
        }
        setReady(true);
    };
    const handlePossiblyABeepBoop = () => {
        var _a, _b;
        if ((_a = props.onIsHuman) === null || _a === void 0 ? void 0 : _a.callback)
            (_b = props.onIsHuman) === null || _b === void 0 ? void 0 : _b.callback(false);
    };
    return (
    //We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
    (0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(react_google_invisible_recaptcha_1.default, { ref: refRecaptcha, onLoaded: () => { var _a; return console.log((_a = refRecaptcha.current) === null || _a === void 0 ? void 0 : _a.callbacks.execute()); }, sitekey: '6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP', onResolved: handleHumanArrived, onError: handlePossiblyABeepBoop, onExpired: handlePossiblyABeepBoop }), !ready), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(LoadingApplicationDataPartial_1.LoadingApplicationDataPartial, {}), ready)] }));
}
exports.RecaptchaTokenLoader = RecaptchaTokenLoader;
