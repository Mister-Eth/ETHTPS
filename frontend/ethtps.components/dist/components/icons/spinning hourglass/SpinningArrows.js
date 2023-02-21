import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from 'react';
import './Spinning hourglass.css';
import { Autorenew } from '@mui/icons-material';
export function SpinningArrows() {
    return (_jsx(Fragment, { children: _jsx(Autorenew, { className: "rotation-animation" }) }));
}
