import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState, Fragment } from 'react';
export function SeeMoreButton(events) {
    const [expand, setExpand] = useState(true);
    const onClick = () => {
        if (expand) {
            if (events.onSeeMore !== undefined) {
                events.onSeeMore();
            }
        }
        else {
            if (events.onSeeLess !== undefined) {
                events.onSeeLess();
            }
        }
        setExpand(!expand);
    };
    const getIcon = () => (expand ? _jsx(ArrowDownward, {}) : _jsx(ArrowUpward, {}));
    return (_jsx(Fragment, { children: _jsxs(Button, { disabled: !events.enabled, variant: "text", sx: {
                width: '100%',
            }, startIcon: getIcon(), endIcon: getIcon(), onClick: () => onClick(), children: ["See ", expand ? 'more' : 'less'] }) }));
}
