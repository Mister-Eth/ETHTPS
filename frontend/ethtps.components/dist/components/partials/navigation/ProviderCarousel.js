import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from 'react';
import { LargeProviderHeader } from '../../widgets/LargeProviderHeader';
import { useGetProvidersFromAppStore } from 'ethtps.data/dist/hooks/ProviderHooks';
export function ProviderCarousel(config) {
    const providers = useGetProvidersFromAppStore();
    return (_jsx(Fragment, { children: _jsx(LargeProviderHeader, { provider: config.provider }) }));
}
