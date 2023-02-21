import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableCell, Tooltip, Typography } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import { centered } from '../../Cells.Types';
import { tableCellTypographyStandard } from './Typography.types';
import { Fragment, useEffect } from 'react';
import { ConditionalRender } from '../../../../Types';
import * as icons from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
export function NameCell(config) {
    const colorDictionary = useGetProviderColorDictionaryFromAppStore();
    const name = config.provider?.name ?? '';
    let color = config.provider?.color ?? 'primary';
    useEffect(() => {
        if (colorDictionary) {
            color = colorDictionary[name];
        }
    }, [colorDictionary]);
    const hasIssues = (config.provider?.status?.isUnreliable ?? false) &&
        (config.provider?.status?.isProbablyDown ?? false);
    const noDataProvider = config.provider?.status === undefined;
    return (_jsx(Fragment, { children: _jsx(Tooltip, { arrow: true, placement: "right", title: _jsx(Typography, { children: `Click to read more about ${name}` }), children: _jsx(TableCell, { ...centered, ...buildClassNames(config), onClick: () => config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'Name')
                    : () => { }, children: _jsx(_Fragment, { children: _jsxs("div", { className: 'box', children: [_jsx(Link, { to: `/Providers/${config.provider?.name}/Overview`, children: _jsxs("div", { children: [_jsx("img", { alt: `${config.provider?.name} icon`, src: `provider-icons/${config.provider?.name}.png`, className: 'tiny-img inline', style: { marginRight: '15px' } }), _jsx(Typography, { className: `inline ${config.clickCallback !== undefined
                                                ? 'pointable'
                                                : ''}`, color: color, ...tableCellTypographyStandard, children: config.provider?.name })] }) }), ConditionalRender(_jsx(_Fragment, { children: _jsx(Tooltip, { arrow: true, placement: "top", className: "spaced-horizontally", title: _jsxs(Typography, { children: ["There are issues getting data for ", config.provider?.name] }), children: _jsx(icons.CloudOff, { className: "inline small centered-vertically" }) }) }), hasIssues && !noDataProvider), ConditionalRender(_jsx(_Fragment, { children: _jsx(Tooltip, { arrow: true, placement: "top", title: _jsxs(Typography, { children: ["There is no data provider for", ' ', config.provider?.name, " :/"] }), children: _jsx(icons.Warning, { className: "spaced-horizontally" }) }) }), noDataProvider)] }) }) }) }) }));
}
