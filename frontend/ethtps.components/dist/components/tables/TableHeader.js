import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { TableRow, TableCell } from '@mui/material';
import { centered } from './Cells.Types';
import { Typography } from '@mui/material/';
import { tableHeaderCellTypography } from './all networks/cells/Typography.types';
import React from 'react';
export function TableHeader(params) {
    return (_jsx(React.Fragment, { children: _jsx(TableRow, { children: params.text?.map((x, i) => (_jsx(TableCell, { sx: { fontWeight: 'bold' }, ...centered, children: _jsxs(Typography, { ...tableHeaderCellTypography, children: [' ', x] }) }, i))) }) }));
}
