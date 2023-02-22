import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import { shortTimeIntervalToUIFormat, useHandler, handleException, } from 'ethtps.data';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import React from 'react';
import { Dropdown } from '../types/Dropdown';
import { useEffect } from 'react';
export function ProviderIntervalDropdown(config) {
    const intervals = useHandler(config.availableIntervals);
    const noDataAvailable = useHandler(config.noDataAvailable);
    config.loader
        ?.dataGetter()
        .then((x) => {
        intervals?.setter(x);
    })
        .catch(handleException);
    useEffect(() => {
        if (intervals?.value?.length === 0) {
            noDataAvailable?.setter(config.provider);
        }
    }, [intervals?.value]);
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { hidden: intervals === undefined, options: intervals?.value
                ?.map((x) => toShortString_2(x))
                .concat(true ? [] : ['Custom']) ?? [] //We'll work on this later on
            , selection: config.changed, conversionFunction: (x) => fromShortString_2(x), uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) }));
}
