import { jsx as _jsx } from "react/jsx-runtime";
import { buildClassNames, } from './ICustomCellConfiguration';
import { SkeletonWithTooltip } from '../../../partials/SkeletonWithTooltip';
import { TableCell } from '@mui/material';
import { tableCellTypographyStandard } from './Typography.types';
import { centered } from '../../Cells.Types';
import '../../cells.styles.css';
import { AnimatedTypography } from '../../../text/AnimatedTypography';
import { toShortString, numberFormat } from '../../../../Types';
import { Fragment } from 'react';
export function DataValueCell(config) {
    return (_jsx(Fragment, { children: _jsx(TableCell, { ...centered, ...buildClassNames(config), onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'DataValue')
                : () => { }, children: config.value === undefined ? (_jsx(SkeletonWithTooltip, { text: `Loading ${config.provider?.name} ${toShortString(config.dataType)}...` })) : (_jsx(AnimatedTypography, { animationClassName: "animated-cell", standard: tableCellTypographyStandard, child: numberFormat(config.value).toString(), durationMs: 1000 })) }) }));
}
