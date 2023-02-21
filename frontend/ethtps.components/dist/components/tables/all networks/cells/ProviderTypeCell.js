import { jsx as _jsx } from "react/jsx-runtime";
import { TableCell, Typography } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import React from 'react';
import { centered } from '../../Cells.Types';
import { tableCellTypographyStandard } from './Typography.types';
import { useGetProviderTypeColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
export function ProviderTypeCell(config) {
    const colorDictionary = useGetProviderTypeColorDictionaryFromAppStore();
    const name = config.provider?.type ?? '';
    const color = colorDictionary !== undefined ? colorDictionary[name] : 'primary';
    return (_jsx(React.Fragment, { children: _jsx(TableCell, { ...centered, ...buildClassNames(config), sx: { color: color }, onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'ProviderType')
                : () => { }, children: _jsx(Typography, { ...tableCellTypographyStandard, children: config.provider?.type }) }) }));
}
