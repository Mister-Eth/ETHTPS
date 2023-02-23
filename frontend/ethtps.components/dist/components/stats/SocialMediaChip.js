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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Web } from '@mui/icons-material';
import { Chip, Link, Typography } from '@mui/material';
import React from 'react';
import { groupBy } from 'groupby-js';
var getIconForWebsite = function (website) {
    switch (website.toUpperCase()) {
        default:
            return _jsx(Web, {});
    }
};
var formatUrl = function (url) {
    if (!(url === null || url === void 0 ? void 0 : url.startsWith('http://')))
        url = 'http://' + url;
    return url;
};
export function SocialMediaChipCollection(config) {
    var links = groupBy('category', config.links);
    if (links === undefined || links.length === 0)
        return (_jsx(React.Fragment, { children: _jsx(Chip, { className: "spaced-vertically", label: _jsx(Typography, __assign({ sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    } }, { children: "No data available" })), variant: "outlined", color: "primary" }) }));
    return (_jsx(React.Fragment, { children: links.flatMap(function (group, i) {
            return (_jsxs(React.Fragment, { children: [_jsx(Chip, { label: _jsx(Typography, __assign({ sx: {
                                fontWeight: 'bold',
                            } }, { children: group.title })) }), group.items.map(function (x, i) { return (_jsx(SocialMediaChip, { href: x.url, websiteName: x.name }, i)); })] }, i));
        }) }));
}
export function SocialMediaChip(config) {
    return (_jsx(React.Fragment, { children: _jsx(Chip, { className: "spaced-vertically", icon: getIconForWebsite(config.websiteName), label: _jsx(Typography, __assign({ fontSize: '1em', color: "primary.text" }, { children: _jsx(Link, __assign({ href: formatUrl(config.href), underline: 'hover', color: "inherit", sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    }, variant: "h6", rel: "noopener" }, { children: config.websiteName })) })), 
            //variant="outlined"
            color: "primary", sx: {
                marginTop: '1em',
            } }) }));
}
//# sourceMappingURL=SocialMediaChip.js.map