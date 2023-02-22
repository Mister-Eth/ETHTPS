import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { liveDataHooks, toShortString } from 'ethtps.data';
import React from 'react';
import { TableHeader } from '../TableHeader';
export function AllProvidersHeader() {
    const mode = liveDataHooks.useGetLiveDataModeFromAppStore();
    const modeStr = toShortString(mode);
    return (_jsxs(React.Fragment, { children: [' ', _jsx(TableHeader, { text: ['#', 'Name', modeStr, `Max recorded ${modeStr}`, 'Type'] })] }));
}
