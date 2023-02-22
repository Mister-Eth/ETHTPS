import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DoNotDisturbAlt } from '@mui/icons-material';
import { Paper, Chip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import { ConditionalRender } from 'src/Types';
import { DataModeButtonGroup } from '../../buttons/groups/data-mode-group/DataModeButtonGroup';
import { DateRangeSelectorDropdown } from '../../dropdowns/concrete/DateRangeSelectorDropdown';
import { NetworksDropdown } from '../../dropdowns/NetworksDropdown';
import { ProviderIntervalDropdown } from '../../dropdowns/ProviderIntervalDropdown';
import { SpinningArrows } from '../../icons/spinning hourglass/SpinningArrows';
import { BrushChart } from '../brush/BrushChart';
import { useHandler } from 'ethtps.data';
import { useQuery } from 'react-query';
export function ProviderDataChart(config) {
    const displayNetworksDropdown = false && config.provider?.provider?.toUpperCase() === 'ETHEREUM';
    const intervalHandler = useHandler(config.interval);
    const modeHandler = useHandler(config.mode);
    const networkHandler = useHandler(config.network);
    const [noData, setNoData] = useState(false);
    const [usesDatePicker, setUsesDatePicker] = useState(false);
    const [points, setPoints] = useState([]);
    useQuery(`${config.provider} ${config.mode} ${config.interval} data`, () => config.request?.refetchFunction());
    useEffect(() => {
        if (config.request?.fetchInfo?.isSuccess) {
            if (config.data) {
                if (config.data?.data)
                    setPoints(config.data?.data?.dataPoints);
            }
            setNoData(false);
        }
    }, [config.data]);
    useEffect(() => {
        if (!config.request?.fetchInfo?.isSuccess) {
            config.request?.refetchFunction();
        }
    }, [config.request?.fetchInfo?.isSuccess]);
    useEffect(() => {
        config.request?.refetchFunction();
    }, [intervalHandler?.value, networkHandler?.value, modeHandler?.value]);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    useEffect(() => {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return (_jsx(React.Fragment, { children: _jsxs(Container, { sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            }, children: [_jsxs(Paper, { elevation: 1, sx: { display: noData ? 'none' : undefined }, children: [displayNetworksDropdown ? (_jsx(NetworksDropdown, { selectionChanged: networkHandler?.setter })) : (_jsx(_Fragment, {})), ConditionalRender(_jsx(DateRangeSelectorDropdown, { hidden: !usesDatePicker }), usesDatePicker), _jsxs("div", { style: { float: 'right' }, children: [_jsx(ProviderIntervalDropdown, { hidden: noData, onNoDataAvailable: (p) => {
                                        setNoData(true);
                                        if (config.onNoDataAvailable) {
                                            config.onNoDataAvailable(p);
                                        }
                                    }, onDataLoaded: (intervals) => intervalHandler?.setter(intervals?.at(0)), provider: config.provider?.provider, selectionChanged: intervalHandler?.setter }), _jsx(DataModeButtonGroup, { modeChanged: modeHandler?.setter })] })] }), _jsx("br", {}), _jsx(Paper, { elevation: 1, children: _jsxs("div", { className: "parent", ref: containerRef, children: [_jsx(BrushChart, { dataPoints: points, width: containerWidth, height: containerWidth / 1.4142 }), ConditionalRender(_jsx(Chip, { label: _jsx(Typography, { sx: { fontWeight: 'bold' }, children: "Loading..." }), color: "primary", className: "appear-delayed child", avatar: _jsx(SpinningArrows, {}), variant: "filled" }), config.request?.fetchInfo?.isFetching), ConditionalRender(_jsx(Chip, { className: "appear child", label: "No data available", avatar: _jsx(DoNotDisturbAlt, {}), variant: "filled", style: { opacity: '100%' } }), noData && !config.request?.fetchInfo?.isFetching)] }) })] }) }));
}
