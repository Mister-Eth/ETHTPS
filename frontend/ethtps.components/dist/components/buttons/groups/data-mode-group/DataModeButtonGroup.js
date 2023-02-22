import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ConditionalRender } from '../../../../Types';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { EvStation, LocalGasStation, Numbers } from '@mui/icons-material';
import { CurrentViewersIcon } from '../../CurrentViewersIcon';
import { DataType, useAppSelector, useHandler } from 'ethtps.data';
export function DataModeButtonGroup(model) {
    const mode = useHandler(model.modeHandle);
    const getColorComparedTo = (proposedMode) => proposedMode == mode?.value ? { color: 'primary' } : undefined;
    const experimentsAppStoreValue = useAppSelector((state) => state.experiments);
    return (_jsx(React.Fragment, { children: _jsxs(Box, { sx: { float: 'right' }, children: [ConditionalRender(_jsx(CurrentViewersIcon, {}), experimentsAppStoreValue?.includes(5) && false), _jsx(Tooltip, { arrow: true, placement: 'top', ...getColorComparedTo(DataType.Tps), title: _jsx(Typography, { children: "Transactions per second" }), children: _jsx(IconButton, { onClick: () => mode?.setter(DataType.Tps), children: _jsx(Numbers, {}) }) }), _jsx(Tooltip, { arrow: true, placement: 'top', ...getColorComparedTo(DataType.Gps), title: _jsx(Typography, { children: "Gas per second" }), children: _jsx(IconButton, { onClick: () => mode?.setter(DataType.Gps), children: _jsx(LocalGasStation, {}) }) }), _jsx(Tooltip, { arrow: true, placement: 'top', ...getColorComparedTo(DataType.GasAdjustedTps), title: _jsx(Typography, { children: "Gas-adjusted transactions per second" }), children: _jsx(IconButton, { onClick: () => mode?.setter(DataType.GasAdjustedTps), children: _jsx(EvStation, {}) }) })] }) }));
}
