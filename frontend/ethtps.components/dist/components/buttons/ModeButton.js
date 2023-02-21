import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from 'react';
import { CustomButtonGroup } from './groups/custom/CustomButtonGroup';
export function ModeButton() {
    return (_jsx(Fragment, { children: _jsx(CustomButtonGroup, { ...{ buttons: ['TPS', 'GPS', 'GTPS'] } }) }));
}
