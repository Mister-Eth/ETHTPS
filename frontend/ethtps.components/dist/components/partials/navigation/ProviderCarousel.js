import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { LargeProviderHeader } from '../../widgets/LargeProviderHeader';
import { useGetProvidersFromAppStore } from 'ethtps.data/dist/hooks/ProviderHooks';
export function ProviderCarousel(config) {
    const providers = useGetProvidersFromAppStore();
    return (_jsx(React.Fragment, { children: _jsx(LargeProviderHeader, { provider: config.provider }) }));
}
