import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Web } from '@mui/icons-material';
import { Chip, Link, Typography } from '@mui/material';
import React from 'react';
import { groupBy } from 'groupby-js';
const getIconForWebsite = (website) => {
    switch (website.toUpperCase()) {
        default:
            return _jsx(Web, {});
    }
};
const formatUrl = (url) => {
    if (!url?.startsWith('http://'))
        url = 'http://' + url;
    return url;
};
export function SocialMediaChipCollection(config) {
    const links = groupBy('category', config.links);
    if (links === undefined || links.length === 0)
        return (_jsx(React.Fragment, { children: _jsx(Chip, { className: "spaced-vertically", label: _jsx(Typography, { sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    }, children: "No data available" }), variant: "outlined", color: "primary" }) }));
    return (_jsx(React.Fragment, { children: links.flatMap((group, i) => {
            return (_jsxs(React.Fragment, { children: [_jsx(Chip, { label: _jsx(Typography, { sx: {
                                fontWeight: 'bold',
                            }, children: group.title }) }), group.items.map((x, i) => (_jsx(SocialMediaChip, { href: x.url, websiteName: x.name }, i)))] }, i));
        }) }));
}
export function SocialMediaChip(config) {
    return (_jsx(React.Fragment, { children: _jsx(Chip, { className: "spaced-vertically", icon: getIconForWebsite(config.websiteName), label: _jsx(Typography, { fontSize: '1em', color: "primary.text", children: _jsx(Link, { href: formatUrl(config.href), underline: 'hover', color: "inherit", sx: {
                        fontWeight: 'bold',
                        fontSize: '1.25em',
                    }, variant: "h6", rel: "noopener", children: config.websiteName }) }), 
            //variant="outlined"
            color: "primary", sx: {
                marginTop: '1em',
            } }) }));
}
