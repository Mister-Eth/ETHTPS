import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css
import React, { useEffect, useRef, useState } from 'react';
import { ProviderIntervalDropdown } from '../dropdowns/ProviderIntervalDropdown';
import { NetworksDropdown } from '../dropdowns/NetworksDropdown';
import Container from '@mui/material/Container/Container';
import { ConditionalRender } from '../../Types';
import { Chip, Paper, Typography } from '@mui/material';
import { DoNotDisturbAlt } from '@mui/icons-material';
import { SpinningArrows } from '../icons/spinning hourglass/SpinningArrows';
import { DateRangeSelectorDropdown } from '../dropdowns/DateRangeSelectorDropdown';
import { api } from '../../services/DependenciesIOC';
import { DataModeButtonGroup } from '../buttons/DataModeButtonGroup';
import { useQuery } from 'react-query';
import { BrushChart } from './brush/BrushChart';
import { DataType } from 'ethtps.api.client';
import moment from 'moment';
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
export function ProviderDataChart(config) {
    const displayNetworksDropdown = false && config.provider.toUpperCase() === 'ETHEREUM';
    const colorDictionary = useGetProviderColorDictionaryFromAppStore() ?? {};
    const [interval, setInterval] = useState();
    const [network, setNetwork] = useState('Mainnet');
    const [mode, setMode] = useState(DataType.Tps);
    const [d, setD] = useState([]);
    const [noData, setNoData] = useState(false);
    const [usesDatePicker, setUsesDatePicker] = useState(false);
    const [loading, setLoading] = useState(true);
    const intervalChanged = (interval) => {
        const usesDate = interval === 'Custom';
        setUsesDatePicker(usesDate);
        if (!usesDate)
            setInterval(interval);
    };
    const modeChanged = (mode) => {
        setMode(mode);
    };
    const networkChanged = (network) => {
        setNetwork(network);
    };
    const [points, setPoints] = useState([
        { x: new Date(), y: 0 },
    ]);
    const { data, isSuccess, refetch } = useQuery('get data', () => api.getL2Data({
        dataType: mode,
        l2DataRequestModel: {
            providers: [config.provider],
            startDate: moment().subtract(1, 'months').toDate(),
        },
    }), { refetchOnMount: false, refetchInterval: 60 * 1000 });
    useEffect(() => {
        if (isSuccess) {
            if (data?.data) {
                if (data.data.dataPoints)
                    setPoints(data.data.dataPoints);
            }
            setNoData(false);
            setLoading(false);
        }
    }, [data]);
    useEffect(() => {
        if (!isSuccess) {
            setLoading(true);
            refetch();
        }
    }, [isSuccess]);
    useEffect(() => {
        setLoading(true);
        refetch();
    }, [interval, network, mode]);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    useEffect(() => {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return (_jsx(React.Fragment, { children: _jsxs(Container, { sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            }, children: [_jsxs(Paper, { elevation: 1, sx: { display: noData ? 'none' : undefined }, children: [displayNetworksDropdown ? (_jsx(NetworksDropdown, { selectionChanged: networkChanged })) : (_jsx(_Fragment, {})), ConditionalRender(_jsx(DateRangeSelectorDropdown, { hidden: !usesDatePicker }), usesDatePicker), _jsxs("div", { style: { float: 'right' }, children: [_jsx(ProviderIntervalDropdown, { hidden: noData, onNoDataAvailable: (p) => {
                                        setNoData(true);
                                        if (config.onNoDataAvailable) {
                                            config.onNoDataAvailable(p);
                                        }
                                    }, onDataLoaded: (intervals) => setInterval(intervals?.at(0)), provider: config.provider, selectionChanged: intervalChanged }), _jsx(DataModeButtonGroup, { modeChanged: modeChanged })] })] }), _jsx("br", {}), _jsx(Paper, { elevation: 1, children: _jsxs("div", { className: "parent", ref: containerRef, children: [_jsx(BrushChart, { dataPoints: points, width: containerWidth, height: containerWidth / 1.4142 }), ConditionalRender(_jsx(Chip, { label: _jsx(Typography, { sx: { fontWeight: 'bold' }, children: "Loading..." }), color: "primary", className: "appear-delayed child", avatar: _jsx(SpinningArrows, {}), variant: "filled" }), loading), ConditionalRender(_jsx(Chip, { className: "appear child", label: "No data available", avatar: _jsx(DoNotDisturbAlt, {}), variant: "filled", style: { opacity: '100%' } }), noData && !loading)] }) })] }) }));
}
