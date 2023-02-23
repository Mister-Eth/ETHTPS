var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { DoNotDisturbAlt } from '@mui/icons-material';
import { Paper, Chip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import { DataModeButtonGroup } from '../../buttons/groups/data-mode-group/DataModeButtonGroup';
import { DateRangeSelectorDropdown } from '../../dropdowns/concrete/DateRangeSelectorDropdown';
import { SpinningArrows } from '../../icons/spinning hourglass/SpinningArrows';
import { BrushChart } from '../brush/BrushChart';
import { useHandler } from 'ethtps.data';
import { useQuery } from 'react-query';
import { ProviderIntervalDropdown } from '../../dropdowns/concrete/ProviderIntervalDropdown';
import { NetworksDropdown } from '../../dropdowns/concrete/NetworksDropdown';
import { ConditionalRender } from '../../../Types';
export function ProviderDataChart(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var displayNetworksDropdown = false && ((_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.provider) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'ETHEREUM';
    var intervalHandler = useHandler(config.interval);
    var modeHandler = useHandler(config.mode);
    var networkHandler = useHandler(config.network);
    var _l = useState(false), noData = _l[0], setNoData = _l[1];
    var usesDatePicker = useState(false)[0];
    var _m = useState([]), points = _m[0], setPoints = _m[1];
    useQuery("".concat(config.provider, " ").concat(config.mode, " ").concat(config.interval, " data"), function () { var _a; return (_a = config.request) === null || _a === void 0 ? void 0 : _a.refetchFunction(); });
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((_b = (_a = config.request) === null || _a === void 0 ? void 0 : _a.fetchInfo) === null || _b === void 0 ? void 0 : _b.isSuccess) {
            if (config.data) {
                if ((_c = config.data) === null || _c === void 0 ? void 0 : _c.data)
                    setPoints((_h = (_g = (_f = (_e = (_d = config.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.dataPoints) === null || _f === void 0 ? void 0 : _f.filter(function (x) { return x !== undefined; })) === null || _g === void 0 ? void 0 : _g.map(function (x) {
                        return (x !== null && x !== void 0 ? x : {
                            x: new Date(),
                            y: 0,
                        });
                    })) !== null && _h !== void 0 ? _h : []);
            }
            setNoData(false);
        }
    }, [config.data]);
    useEffect(function () {
        var _a, _b, _c;
        if (!((_b = (_a = config.request) === null || _a === void 0 ? void 0 : _a.fetchInfo) === null || _b === void 0 ? void 0 : _b.isSuccess)) {
            (_c = config.request) === null || _c === void 0 ? void 0 : _c.refetchFunction();
        }
    }, [(_d = (_c = config.request) === null || _c === void 0 ? void 0 : _c.fetchInfo) === null || _d === void 0 ? void 0 : _d.isSuccess]);
    useEffect(function () {
        var _a;
        (_a = config.request) === null || _a === void 0 ? void 0 : _a.refetchFunction();
    }, [intervalHandler === null || intervalHandler === void 0 ? void 0 : intervalHandler.value, networkHandler === null || networkHandler === void 0 ? void 0 : networkHandler.value, modeHandler === null || modeHandler === void 0 ? void 0 : modeHandler.value]);
    var _o = useState(0), containerWidth = _o[0], setContainerWidth = _o[1];
    var containerRef = useRef(null);
    useEffect(function () {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return (_jsx(React.Fragment, { children: _jsxs(Container, __assign({ sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            } }, { children: [_jsxs(Paper, __assign({ elevation: 1, sx: { display: noData ? 'none' : undefined } }, { children: [displayNetworksDropdown ? (_jsx(NetworksDropdown, { changed: networkHandler })) : (_jsx(_Fragment, {})), ConditionalRender(_jsx(DateRangeSelectorDropdown, { hidden: !usesDatePicker }), usesDatePicker), _jsxs("div", __assign({ style: { float: 'right' } }, { children: [_jsx(ProviderIntervalDropdown, { hidden: noData, noDataAvailable: config.onNoDataAvailable, changed: (_e = config.interval) === null || _e === void 0 ? void 0 : _e.callback, provider: (_f = config.provider) === null || _f === void 0 ? void 0 : _f.provider }), _jsx(DataModeButtonGroup, { modeHandle: modeHandler === null || modeHandler === void 0 ? void 0 : modeHandler.convertToIHandler() })] }))] })), _jsx("br", {}), _jsx(Paper, __assign({ elevation: 1 }, { children: _jsxs("div", __assign({ className: "parent", ref: containerRef }, { children: [_jsx(BrushChart, { dataPoints: points, width: containerWidth, height: containerWidth / 1.4142 }), ConditionalRender(_jsx(Chip, { label: _jsx(Typography, __assign({ sx: { fontWeight: 'bold' } }, { children: "Loading..." })), color: "primary", className: "appear-delayed child", avatar: _jsx(SpinningArrows, {}), variant: "filled" }), (_h = (_g = config.request) === null || _g === void 0 ? void 0 : _g.fetchInfo) === null || _h === void 0 ? void 0 : _h.isFetching), ConditionalRender(_jsx(Chip, { className: "appear child", label: "No data available", avatar: _jsx(DoNotDisturbAlt, {}), variant: "filled", style: { opacity: '100%' } }), noData && !((_k = (_j = config.request) === null || _j === void 0 ? void 0 : _j.fetchInfo) === null || _k === void 0 ? void 0 : _k.isFetching))] })) }))] })) }));
}
//# sourceMappingURL=ProviderDataChart.js.map