import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip, Typography, IconButton, Paper, DialogTitle, Dialog, List, ListItem, Box, } from '@mui/material';
import { Fragment } from 'react';
import { QuestionMark } from '@mui/icons-material';
import { useState } from 'react';
import { ConditionalRender } from '../../../Types';
import { FaceRatingGroup } from '../feedback/FaceRatingGroup';
export function SimpleDesktopFeedbackExperiment() {
    const [display, setDisplay] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hovered, setHovered] = useState(false);
    setTimeout(() => {
        setDisplay(true);
    }, 1 * 1000); //Display after 15 seconds
    const handleClickOpen = () => {
        setShowPopup(true);
    };
    const handleClose = () => {
        setShowPopup(false);
    };
    return (_jsx(Fragment, { children: ConditionalRender(_jsxs("div", { style: {
                position: 'fixed',
                top: 'auto',
                bottom: '2rem',
                left: 'auto',
                right: '2rem',
            }, children: [_jsx(Paper, { onClick: handleClickOpen, children: _jsx(Tooltip, { arrow: true, placement: "left", title: _jsx(Typography, { children: "Do you like the changes?" }), children: _jsx(IconButton, { onClick: handleClickOpen, children: _jsx(QuestionMark, {}) }) }) }), ConditionalRender(_jsx(Dialog, { onClose: handleClose, open: true, children: _jsxs(List, { sx: { pt: 0 }, children: [_jsx(ListItem, { children: _jsx(DialogTitle, { sx: { fontWeight: 'bold' }, children: "How would you rate the new version of the website?" }) }), _jsx(ListItem, { children: _jsx(Box, { sx: { width: '95%' }, children: _jsx(FaceRatingGroup, {}) }) })] }) }), showPopup)] }), display) }));
}
