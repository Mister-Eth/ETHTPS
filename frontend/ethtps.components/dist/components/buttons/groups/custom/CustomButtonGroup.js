import { jsx as _jsx } from "react/jsx-runtime";
import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
export function CustomButtonGroup(params) {
    return (_jsx(React.Fragment, { children: _jsx(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group", children: params?.buttons?.map((x, i) => (_jsx(Button, { children: x }, i))) }) }));
}
