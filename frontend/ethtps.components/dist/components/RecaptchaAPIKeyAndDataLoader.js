import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, createRef, useState, useEffect } from 'react';
import { ConditionalRender } from '../Types';
import Recaptcha from 'react-google-invisible-recaptcha';
import { LoadingApplicationDataPartial } from './partials/loading/LoadingApplicationDataPartial';
import { useSetStoreAPIKey, } from 'ethtps.data';
export function RecaptchaAPIKeyAndDataLoader() {
    const [hasAPIKey, setHasAPIKey] = useState(getAPIKey() !== undefined && getAPIKey() !== null);
    const [ready, setReady] = useState(hasAPIKey);
    if (hasAPIKey) {
        api.resetConfig();
    }
    useEffect(() => {
        setReady(hasAPIKey);
    }, [hasAPIKey]);
    const refRecaptcha = createRef();
    const handleHumanArrived = () => {
        const retryHandler = (err) => {
            console.log(`Failed for some reason (${err})`);
            setTimeout(() => {
                handleHumanArrived();
            }, 2500);
        };
        const token = refRecaptcha.current?.callbacks.getResponse();
        console.log(`Human with token ${token} is here. Getting new API key...`);
        api.getNewAPIKey(token)
            .then((x) => {
            console.log(`Got API key ${JSON.stringify(x)}`);
            if (x !== undefined) {
                setAPIKey(x.key);
                setHasAPIKey(true);
                useSetStoreAPIKey(x.key);
                api.resetConfig();
            }
        })
            .catch(retryHandler);
    };
    const handlePossiblyABeepBoop = () => { };
    return (
    //We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
    _jsxs(Fragment, { children: [ConditionalRender(_jsx(Recaptcha, { ref: refRecaptcha, onLoaded: () => console.log(refRecaptcha.current?.callbacks.execute()), sitekey: '6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP', onResolved: handleHumanArrived, onError: handlePossiblyABeepBoop, onExpired: handlePossiblyABeepBoop }), !ready), ConditionalRender(_jsx(LoadingApplicationDataPartial, {}), ready)] }));
}
