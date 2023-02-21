import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableRow, TableCell } from '@mui/material';
import { IndexCell } from './cells/IndexCell';
import { NameCell } from './cells/NameCell';
import { DataValueCell } from './cells/DataValueCell';
import { MaxValueCell } from './cells/MaxValueCell';
import { ProviderTypeCell } from './cells/ProviderTypeCell';
import { SkeletonWithTooltip } from '../../partials/SkeletonWithTooltip';
import { extractData, getModeData } from '../../../Types';
import { Fragment, useEffect, useState } from 'react';
import { range } from 'lodash';
import { liveDataHooks } from 'ethtps.data';
export function AllProvidersRows(model) {
    const hasData = model.providerData?.length > 0;
    const mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    const liveData = liveDataHooks.useGetLiveDataFromAppStore();
    const [data, setData] = useState(getModeData(liveData ?? {}, mode));
    useEffect(() => {
        setData(getModeData(liveData ?? {}, mode));
    }, [mode, liveData]);
    return (_jsx(Fragment, { children: hasData ? (_jsx(_Fragment, { children: model.providerData
                ?.slice(0, Math.min(model.providerData?.length, model.maxRowsBeforeShowingExpand))
                ?.map((x, i) => (_jsxs(TableRow, { children: [_jsx(IndexCell, { clickCallback: model.clickCallback, index: i + 1 }), _jsx(NameCell, { clickCallback: model.clickCallback, provider: x }), _jsx(DataValueCell, { clickCallback: model.clickCallback, provider: x, dataType: mode, value: extractData(data, x.name) }), _jsx(MaxValueCell, { clickCallback: model.clickCallback, provider: x }), _jsx(ProviderTypeCell, { clickCallback: model.clickCallback, provider: x })] }, i))) })) : (range(0, 4 + 1).map((y) => {
            return (_jsx(TableRow, { children: range(0, 5).map((x) => (_jsx(TableCell, { children: _jsx(SkeletonWithTooltip, { randomDelay: true, rectangular: false }) }, x))) }, y));
        })) }));
}
