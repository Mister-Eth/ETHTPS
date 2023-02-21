import { jsx as _jsx } from "react/jsx-runtime";
import { Dropdown } from './Dropdown';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { api } from '../../services/DependenciesIOC';
import { useState, useEffect } from 'react';
import { shortTimeIntervalToUIFormat } from '../../Types';
import { toShortString_2, fromShortString_2, } from 'ethtps.data/dist/models/TimeIntervals';
import React from 'react';
export function ProviderIntervalDropdown(config) {
    const [intervals, setIntervals] = useState();
    const { data, status } = useQuery(`${config.provider}-intervals`, () => api.getIntervalsWithData(config.provider), {});
    useEffect(() => {
        if (status === 'success') {
            setIntervals(data);
            if (data === undefined || data.length === 0) {
                if (config.onNoDataAvailable !== undefined) {
                    config.onNoDataAvailable(config.provider);
                }
            }
            else {
                if (config.onDataLoaded !== undefined) {
                    config.onDataLoaded(data);
                }
            }
        }
    }, [data, status]);
    return (_jsx(React.Fragment, { children: _jsx(Dropdown, { hidden: intervals === undefined, options: intervals === undefined
                ? []
                : intervals
                    ?.map((x) => toShortString_2(x))
                    .concat(true ? [] : ['Custom']) //We'll work on this later on
            , selectionChanged: config.selectionChanged, conversionFunction: (x) => fromShortString_2(x), uiFormatFunction: shortTimeIntervalToUIFormat, hoverText: _jsx(Typography, { children: 'Select time interval' }) }) }));
}
