import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableHeader } from '../TableHeader';
import { toShortString } from '../../../Types';
import { liveDataHooks } from 'ethtps.data';
import React from 'react';
export function AllProvidersHeader() {
    const mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    const modeStr = toShortString(mode);
    return (_jsxs(React.Fragment, { children: [' ', _jsx(TableHeader, { text: ['#', 'Name', modeStr, `Max recorded ${modeStr}`, 'Type'] })] }));
}
