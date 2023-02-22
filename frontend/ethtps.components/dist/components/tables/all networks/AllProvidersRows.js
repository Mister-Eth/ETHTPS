import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableCell, TableRow } from '@mui/material';
import { range } from 'd3-array';
import { extractData, getModeData, liveDataHooks, } from 'ethtps.data';
import React, { useEffect, useState } from 'react';
import { SkeletonWithTooltip } from 'src/components/partials/skeletons/SkeletonWithTooltip';
import { IndexCell } from './cells/IndexCell';
import { NameCell } from './cells/NameCell';
import { DataValueCell } from './cells/DataValueCell';
import { MaxValueCell } from './cells/MaxValueCell';
import { ProviderTypeCell } from './cells/ProviderTypeCell';
export function AllProvidersRows(model) {
    const hasData = model.providerData?.length > 0;
    const mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    const liveData = liveDataHooks.useGetLiveDataFromAppStore();
    const [data, setData] = useState(getModeData(liveData ?? {}, mode));
    useEffect(() => {
        setData(getModeData(liveData ?? {}, mode));
    }, [mode, liveData]);
    return (_jsx(React.Fragment, { children: hasData ? (_jsx(_Fragment, { children: model.providerData
                ?.slice(0, Math.min(model.providerData?.length, model.maxRowsBeforeShowingExpand))
                ?.map((x, i) => (_jsxs(TableRow, { children: [_jsx(IndexCell, { clickCallback: model.clickCallback, index: i + 1 }), _jsx(NameCell, { clickCallback: model.clickCallback, provider: x }), _jsx(DataValueCell, { clickCallback: model.clickCallback, provider: x, dataType: mode, value: extractData(data, x.name) }), _jsx(MaxValueCell, { clickCallback: model.clickCallback, provider: x }), _jsx(ProviderTypeCell, { clickCallback: model.clickCallback, provider: x })] }, i))) })) : (range(0, 4 + 1).map((y) => {
            return (_jsx(TableRow, { children: range(0, 5).map((x) => (_jsx(TableCell, { children: _jsx(SkeletonWithTooltip, { randomDelay: true, rectangular: false }) }, x))) }, y));
        })) }));
}
