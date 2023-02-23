import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { useState } from 'react';
import { ConditionalRender } from '../../Types';
import { SimpleDesktopFeedbackExperiment } from './desktop/SimpleDesktopFeedbackExperiment';
import { store, handleException, useAppSelector, setExperiments, } from 'ethtps.data';
import React from 'react';
export async function TestTube(request, params) {
    const [currentExperiments, setCurrentExperiments] = useState(useAppSelector((state) => state.experiments) || []);
    /*
    const [fetchedFromServer, setFetchedFromServer] = useState(false)
    if (!fetchedFromServer) {
        loadAvailableExperiments(isDesktop ? 'Desktop' : 'Mobile').then((x) => {
            setCurrentExperiments(x)
            store.dispatch(setExperiments(x))
            setFetchedFromServer(true)
        })
    }*/
    try {
        const result = await request.dataGetter(params);
        setCurrentExperiments(result);
        store.dispatch(setExperiments(result));
    }
    catch (e) {
        handleException(e);
    }
    return (_jsxs(React.Fragment, { children: [_jsx(BrowserView, { children: ConditionalRender(_jsx(SimpleDesktopFeedbackExperiment, {}), currentExperiments?.some((x) => x === 2)) }), _jsx(MobileOnlyView, {})] }));
}
