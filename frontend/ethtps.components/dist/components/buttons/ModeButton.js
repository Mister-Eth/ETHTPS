import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { CustomButtonGroup } from './groups/custom/CustomButtonGroup';
export function ModeButton() {
    return (_jsx(React.Fragment, { children: _jsx(CustomButtonGroup, { ...{ buttons: ['TPS', 'GPS', 'GTPS'] } }) }));
}
