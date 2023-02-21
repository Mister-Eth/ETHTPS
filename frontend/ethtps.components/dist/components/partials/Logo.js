import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import Fragment from 'react';
export function Logo() {
    return (_jsx(Fragment, { children: _jsxs(Link, { style: {
                textDecoration: 'none',
            }, to: "/", children: [_jsx("br", {}), _jsx("div", { className: 'jumpy unselectable', style: {
                        fontSize: 30,
                        display: 'inline',
                    }, children: "ETHTPS.info" })] }) }));
}
