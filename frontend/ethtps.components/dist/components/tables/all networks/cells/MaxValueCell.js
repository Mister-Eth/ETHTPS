import { jsx as _jsx } from "react/jsx-runtime";
import { Typography, TableCell, Tooltip } from '@mui/material';
import { numberFormat, liveDataHooks } from 'ethtps.data';
import { useGetMaxDataForProviderFromAppStore } from 'ethtps.data/dist/hooks/DataHooks';
import moment from 'moment';
import React from 'react';
import { centered } from '../../Cells.Types';
import { buildClassNames, } from './ICustomCellConfiguration';
import { tableCellTypographyStandard } from './Typography.types';
function generateMaxHoverMessage(data) {
    if (data === undefined ||
        (data?.blockNumber === undefined && data?.date === undefined) ||
        data?.blockNumber === 0 ||
        moment(data?.date).year() === undefined ||
        moment(data?.date).year() === 1) {
        return '';
    }
    if (data?.blockNumber !== undefined && data?.blockNumber !== 0) {
        return `Seen at block ${numberFormat(data?.blockNumber ?? 0).toString()}`;
    }
    return `Seen ${moment(data?.date)}`;
}
function generateMaxTypography(data) {
    const message = generateMaxHoverMessage(data);
    return message?.length > 0 ? _jsx(Typography, { children: message }) : undefined;
}
export function MaxValueCell(config) {
    const type = liveDataHooks.useGetLiveDataModeFromAppStore();
    const maxData = useGetMaxDataForProviderFromAppStore(config.provider?.name, type);
    const tooltipTypography = generateMaxTypography(maxData);
    return (_jsx(React.Fragment, { children: _jsx(TableCell, { ...centered, ...buildClassNames(config), onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'MaxValue')
                : () => { }, children: _jsx(Tooltip, { arrow: true, placement: "top-start", title: tooltipTypography, children: _jsx(Typography, { ...tableCellTypographyStandard, sx: {
                        textDecoration: tooltipTypography !== undefined
                            ? 'underline'
                            : undefined,
                    }, children: numberFormat(maxData?.value).toString() }) }) }) }));
}
