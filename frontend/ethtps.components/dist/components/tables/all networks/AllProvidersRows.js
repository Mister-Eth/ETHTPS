import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableCell, TableRow } from '@mui/material';
import { range } from 'd3-array';
import { extractData, getModeData, liveDataHooks, } from 'ethtps.data';
import React, { useEffect, useState } from 'react';
import { IndexCell } from './cells/IndexCell';
import { NameCell } from './cells/NameCell';
import { DataValueCell } from './cells/DataValueCell';
import { MaxValueCell } from './cells/MaxValueCell';
import { ProviderTypeCell } from './cells/ProviderTypeCell';
import { SkeletonWithTooltip } from '../../partials/skeletons/SkeletonWithTooltip';
export function AllProvidersRows(model) {
    var _a, _b, _c, _d;
    var hasData = ((_a = model.providerData) === null || _a === void 0 ? void 0 : _a.length) > 0;
    var mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    var liveData = liveDataHooks.useGetLiveDataFromAppStore();
    var _e = useState(getModeData(liveData !== null && liveData !== void 0 ? liveData : {}, mode)), data = _e[0], setData = _e[1];
    useEffect(function () {
        setData(getModeData(liveData !== null && liveData !== void 0 ? liveData : {}, mode));
    }, [mode, liveData]);
    return (_jsx(React.Fragment, { children: hasData ? (_jsx(_Fragment, { children: (_d = (_b = model.providerData) === null || _b === void 0 ? void 0 : _b.slice(0, Math.min((_c = model.providerData) === null || _c === void 0 ? void 0 : _c.length, model.maxRowsBeforeShowingExpand))) === null || _d === void 0 ? void 0 : _d.map(function (x, i) { return (_jsxs(TableRow, { children: [_jsx(IndexCell, { clickCallback: model.clickCallback, index: i + 1 }), _jsx(NameCell, { clickCallback: model.clickCallback, provider: x }), _jsx(DataValueCell, { clickCallback: model.clickCallback, provider: x, dataType: mode, value: extractData(data, x.name) }), _jsx(MaxValueCell, { clickCallback: model.clickCallback, provider: x }), _jsx(ProviderTypeCell, { clickCallback: model.clickCallback, provider: x })] }, i)); }) })) : (range(0, 4 + 1).map(function (y) {
            return (_jsx(TableRow, { children: range(0, 5).map(function (x) { return (_jsx(TableCell, { children: _jsx(SkeletonWithTooltip, { randomDelay: true, rectangular: false }) }, x)); }) }, y));
        })) }));
}
//# sourceMappingURL=AllProvidersRows.js.map