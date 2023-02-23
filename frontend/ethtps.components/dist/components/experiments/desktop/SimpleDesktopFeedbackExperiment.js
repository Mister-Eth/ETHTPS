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
import { Tooltip, Typography, IconButton, Paper, DialogTitle, Dialog, List, ListItem, Box, } from '@mui/material';
import React from 'react';
import { QuestionMark } from '@mui/icons-material';
import { useState } from 'react';
import { ConditionalRender } from '../../../Types';
import { FaceRatingGroup } from '../feedback/FaceRatingGroup';
export function SimpleDesktopFeedbackExperiment() {
    var _a = useState(false), display = _a[0], setDisplay = _a[1];
    var _b = useState(false), showPopup = _b[0], setShowPopup = _b[1];
    setTimeout(function () {
        setDisplay(true);
    }, 1 * 1000); //Display after 15 seconds
    var handleClickOpen = function () {
        setShowPopup(true);
    };
    var handleClose = function () {
        setShowPopup(false);
    };
    return (_jsx(React.Fragment, { children: ConditionalRender(_jsxs("div", __assign({ style: {
                position: 'fixed',
                top: 'auto',
                bottom: '2rem',
                left: 'auto',
                right: '2rem',
            } }, { children: [_jsx(Paper, __assign({ onClick: handleClickOpen }, { children: _jsx(Tooltip, __assign({ arrow: true, placement: "left", title: _jsx(Typography, { children: "Do you like the changes?" }) }, { children: _jsx(IconButton, __assign({ onClick: handleClickOpen }, { children: _jsx(QuestionMark, {}) })) })) })), ConditionalRender(_jsx(Dialog, __assign({ onClose: handleClose, open: true }, { children: _jsxs(List, __assign({ sx: { pt: 0 } }, { children: [_jsx(ListItem, { children: _jsx(DialogTitle, __assign({ sx: { fontWeight: 'bold' } }, { children: "How would you rate the new version of the website?" })) }), _jsx(ListItem, { children: _jsx(Box, __assign({ sx: { width: '95%' } }, { children: _jsx(FaceRatingGroup, {}) })) })] })) })), showPopup)] })), display) }));
}
//# sourceMappingURL=SimpleDesktopFeedbackExperiment.js.map