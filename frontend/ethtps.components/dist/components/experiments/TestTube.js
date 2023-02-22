import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserView, MobileOnlyView, isDesktop } from 'react-device-detect';
import { useState } from 'react';
import { ConditionalRender } from '../../Types';
import { SimpleDesktopFeedbackExperiment } from './desktop/SimpleDesktopFeedbackExperiment';
import { setExperiments } from 'ethtps.data/dist/slices/ExperimentSlice';
import { store, useAppSelector } from 'ethtps.data';
import React from 'react';
export function TestTube() {
    const [currentExperiments, setCurrentExperiments] = useState(useAppSelector((state) => state.experiments) || []);
    const [fetchedFromServer, setFetchedFromServer] = useState(false);
    if (!fetchedFromServer) {
        loadAvailableExperiments(isDesktop ? 'Desktop' : 'Mobile').then((x) => {
            setCurrentExperiments(x);
            store.dispatch(setExperiments(x));
            setFetchedFromServer(true);
        });
    }
    useEffect(() => { }, [currentExperiments]);
    return (_jsxs(React.Fragment, { children: [_jsx(BrowserView, { children: ConditionalRender(_jsx(SimpleDesktopFeedbackExperiment, {}), currentExperiments?.some((x) => x === 2)) }), _jsx(MobileOnlyView, {})] }));
}
