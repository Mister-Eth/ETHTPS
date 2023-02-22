import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableContainer, Paper, Table, TableHead, TableBody, } from '@mui/material';
import { useState } from 'react';
import { AllProvidersHeader } from './AllProvidersHeader';
import { AllProvidersRows } from './AllProvidersRows';
import React from 'react';
import { SeeMoreButton } from '../../buttons/see-more/SeeMoreButton';
import { ConditionalRender } from '../../../Types';
export function AllProvidersTable(tableData) {
    const oldShowRowCountValue = tableData.maxRowsBeforeShowingExpand;
    const [showRowCount, setShowRowCount] = useState(tableData?.maxRowsBeforeShowingExpand);
    const onSeeMore = () => {
        setShowRowCount(tableData.providerData?.length);
    };
    const onSeeLess = () => {
        setShowRowCount(oldShowRowCountValue);
    };
    return (_jsxs(React.Fragment, { children: [_jsx(TableContainer, { component: Paper, children: _jsxs(Table
                //size="small"
                , { 
                    //size="small"
                    sx: {
                        minWidth: 750,
                    }, "aria-label": "collapsible table", children: [_jsx(TableHead, { children: _jsx(AllProvidersHeader, {}) }), _jsx(TableBody, { children: _jsx(AllProvidersRows, { ...tableData, maxRowsBeforeShowingExpand: showRowCount }) })] }) }), ConditionalRender(_jsx(SeeMoreButton, { enabled: tableData.providerData?.length > 0, onSeeMore: onSeeMore, onSeeLess: onSeeLess }), showRowCount > 0)] }));
}
