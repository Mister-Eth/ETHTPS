import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
import { createRef } from 'react';
import { ConditionalRender } from '../Types';
import Recaptcha from 'react-google-invisible-recaptcha';
import { LoadingApplicationDataPartial } from './partials/loading/LoadingApplicationDataPartial';
import React from 'react';
import { useState } from 'react';
export function RecaptchaTokenLoader(props) {
    var _a;
    var _b = useState(JSON.parse((_a = localStorage.getItem('XAPIKey')) !== null && _a !== void 0 ? _a : 'false')), ready = _b[0], setReady = _b[1];
    var refRecaptcha = createRef();
    var handleHumanArrived = function () {
        var _a, _b, _c, _d, _e;
        var tokenData = (_a = refRecaptcha.current) === null || _a === void 0 ? void 0 : _a.callbacks.getResponse();
        if ((_b = props.onKeyLoaded) === null || _b === void 0 ? void 0 : _b.callback) {
            (_c = props.onKeyLoaded) === null || _c === void 0 ? void 0 : _c.callback(tokenData);
            if ((_d = props.onIsHuman) === null || _d === void 0 ? void 0 : _d.callback)
                (_e = props.onIsHuman) === null || _e === void 0 ? void 0 : _e.callback(true);
        }
        setReady(true);
    };
    var handlePossiblyABeepBoop = function () {
        var _a, _b;
        if ((_a = props.onIsHuman) === null || _a === void 0 ? void 0 : _a.callback)
            (_b = props.onIsHuman) === null || _b === void 0 ? void 0 : _b.callback(false);
    };
    return (
    //We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
    _jsxs(React.Fragment, { children: [ConditionalRender(_jsx(Recaptcha, { ref: refRecaptcha, onLoaded: function () { var _a; return console.log((_a = refRecaptcha.current) === null || _a === void 0 ? void 0 : _a.callbacks.execute()); }, sitekey: '6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP', onResolved: handleHumanArrived, onError: handlePossiblyABeepBoop, onExpired: handlePossiblyABeepBoop }), !ready), ConditionalRender(_jsx(LoadingApplicationDataPartial, {}), ready)] }));
}
//# sourceMappingURL=RecaptchaTokenLoader.js.map