import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, TableCell } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import { ArrowRight } from '@mui/icons-material';
import { ConditionalRender } from '../../../../Types';
import React from 'react';
export function IndexCell(config) {
    return (_jsx(React.Fragment, { children: _jsx(TableCell, { ...buildClassNames(config), onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'Index')
                : () => { }, children: _jsx(IconButton, { children: _jsxs(_Fragment, { children: [ConditionalRender(_jsx(ArrowRight, {}), config.showTick), config.index] }), sx: {
                    fontSize: '13px',
                    height: '1rem',
                    width: '2rem',
                    fontWeight: config.showTick ? 'bold' : undefined,
                } }) }) }));
}
