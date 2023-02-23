"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDesktopFeedbackExperiment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const icons_material_1 = require("@mui/icons-material");
const react_2 = require("react");
const Types_1 = require("../../../Types");
const FaceRatingGroup_1 = require("../feedback/FaceRatingGroup");
function SimpleDesktopFeedbackExperiment() {
    const [display, setDisplay] = (0, react_2.useState)(false);
    const [showPopup, setShowPopup] = (0, react_2.useState)(false);
    setTimeout(() => {
        setDisplay(true);
    }, 1 * 1000); //Display after 15 seconds
    const handleClickOpen = () => {
        setShowPopup(true);
    };
    const handleClose = () => {
        setShowPopup(false);
    };
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                position: 'fixed',
                top: 'auto',
                bottom: '2rem',
                left: 'auto',
                right: '2rem',
            } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ onClick: handleClickOpen }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "left", title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Do you like the changes?" }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: handleClickOpen }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.QuestionMark, {}) })) })) })), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(material_1.Dialog, Object.assign({ onClose: handleClose, open: true }, { children: (0, jsx_runtime_1.jsxs)(material_1.List, Object.assign({ sx: { pt: 0 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.DialogTitle, Object.assign({ sx: { fontWeight: 'bold' } }, { children: "How would you rate the new version of the website?" })) }), (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { width: '95%' } }, { children: (0, jsx_runtime_1.jsx)(FaceRatingGroup_1.FaceRatingGroup, {}) })) })] })) })), showPopup)] })), display) }));
}
exports.SimpleDesktopFeedbackExperiment = SimpleDesktopFeedbackExperiment;
