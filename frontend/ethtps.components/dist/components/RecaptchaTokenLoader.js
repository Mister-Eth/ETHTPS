import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
import { createRef } from 'react';
import { ConditionalRender } from '../Types';
import Recaptcha from 'react-google-invisible-recaptcha';
import { LoadingApplicationDataPartial } from './partials/loading/LoadingApplicationDataPartial';
import React from 'react';
import { useState } from 'react';
export function RecaptchaTokenLoader(props) {
    const [ready, setReady] = useState(JSON.parse(localStorage.getItem('XAPIKey') ?? 'false'));
    const refRecaptcha = createRef();
    const handleHumanArrived = () => {
        const tokenData = refRecaptcha.current?.callbacks.getResponse();
        if (props.onKeyLoaded?.callback) {
            props.onKeyLoaded?.callback(tokenData);
            if (props.onIsHuman?.callback)
                props.onIsHuman?.callback(true);
        }
        setReady(true);
    };
    const handlePossiblyABeepBoop = () => {
        if (props.onIsHuman?.callback)
            props.onIsHuman?.callback(false);
    };
    return (
    //We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
    _jsxs(React.Fragment, { children: [ConditionalRender(_jsx(Recaptcha, { ref: refRecaptcha, onLoaded: () => console.log(refRecaptcha.current?.callbacks.execute()), sitekey: '6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP', onResolved: handleHumanArrived, onError: handlePossiblyABeepBoop, onExpired: handlePossiblyABeepBoop }), !ready), ConditionalRender(_jsx(LoadingApplicationDataPartial, {}), ready)] }));
}
