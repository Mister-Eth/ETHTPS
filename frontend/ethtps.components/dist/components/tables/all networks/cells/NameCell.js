var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TableCell, Tooltip, Typography } from '@mui/material';
import { buildClassNames, } from './ICustomCellConfiguration';
import { centered } from '../../Cells.Types';
import { tableCellTypographyStandard } from './Typography.types';
import { useEffect } from 'react';
import { ConditionalRender } from '../../../../Types';
import * as icons from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks';
import React from 'react';
export function NameCell(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var colorDictionary = useGetProviderColorDictionaryFromAppStore();
    var name = (_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
    var color = (_d = (_c = config.provider) === null || _c === void 0 ? void 0 : _c.color) !== null && _d !== void 0 ? _d : 'primary';
    useEffect(function () {
        if (colorDictionary) {
            color = colorDictionary[name];
        }
    }, [colorDictionary]);
    var hasIssues = ((_g = (_f = (_e = config.provider) === null || _e === void 0 ? void 0 : _e.status) === null || _f === void 0 ? void 0 : _f.isUnreliable) !== null && _g !== void 0 ? _g : false) &&
        ((_k = (_j = (_h = config.provider) === null || _h === void 0 ? void 0 : _h.status) === null || _j === void 0 ? void 0 : _j.isProbablyDown) !== null && _k !== void 0 ? _k : false);
    var noDataProvider = ((_l = config.provider) === null || _l === void 0 ? void 0 : _l.status) === undefined;
    return (_jsx(React.Fragment, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "right", title: _jsx(Typography, { children: "Click to read more about ".concat(name) }) }, { children: _jsx(TableCell, __assign({}, centered, buildClassNames(config), { onClick: function () {
                    return config.clickCallback !== undefined
                        ? config.clickCallback(config.provider, 'Name')
                        : function () { };
                } }, { children: _jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'box' }, { children: [_jsx(Link, __assign({ to: "/Providers/".concat((_m = config.provider) === null || _m === void 0 ? void 0 : _m.name, "/Overview") }, { children: _jsxs("div", { children: [_jsx("img", { alt: "".concat((_o = config.provider) === null || _o === void 0 ? void 0 : _o.name, " icon"), src: "provider-icons/".concat((_p = config.provider) === null || _p === void 0 ? void 0 : _p.name, ".png"), className: 'tiny-img inline', style: { marginRight: '15px' } }), _jsx(Typography, __assign({ className: "inline ".concat(config.clickCallback !== undefined
                                                ? 'pointable'
                                                : ''), color: color }, tableCellTypographyStandard, { children: (_q = config.provider) === null || _q === void 0 ? void 0 : _q.name }))] }) })), ConditionalRender(_jsx(_Fragment, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "top", className: "spaced-horizontally", title: _jsxs(Typography, { children: ["There are issues getting data for ", (_r = config.provider) === null || _r === void 0 ? void 0 : _r.name] }) }, { children: _jsx(icons.CloudOff, { className: "inline small centered-vertically" }) })) }), hasIssues && !noDataProvider), ConditionalRender(_jsx(_Fragment, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "top", title: _jsxs(Typography, { children: ["There is no data provider for", ' ', (_s = config.provider) === null || _s === void 0 ? void 0 : _s.name, " :/"] }) }, { children: _jsx(icons.Warning, { className: "spaced-horizontally" }) })) }), noDataProvider)] })) }) })) })) }));
}
//# sourceMappingURL=NameCell.js.map