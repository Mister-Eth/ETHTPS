import { jsx as _jsx } from "react/jsx-runtime";
import { Visibility } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
export function CurrentViewersIcon() {
    return (_jsx(Fragment, { children: _jsx(Tooltip, { arrow: true, title: _jsx(Typography, { children: "Nobody's here" }), children: _jsx(IconButton, { children: _jsx(Visibility, {}) }) }) }));
}
