"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceRatingGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("@mui/material/styles");
const SentimentVeryDissatisfied_1 = __importDefault(require("@mui/icons-material/SentimentVeryDissatisfied"));
const SentimentDissatisfied_1 = __importDefault(require("@mui/icons-material/SentimentDissatisfied"));
const SentimentSatisfied_1 = __importDefault(require("@mui/icons-material/SentimentSatisfied"));
const SentimentSatisfiedAltOutlined_1 = __importDefault(require("@mui/icons-material/SentimentSatisfiedAltOutlined"));
const SentimentVerySatisfied_1 = __importDefault(require("@mui/icons-material/SentimentVerySatisfied"));
const material_1 = require("@mui/material");
const customIcons = [
    {
        icon: ((0, jsx_runtime_1.jsx)(SentimentVeryDissatisfied_1.default, { fontSize: "inherit", color: "error" })),
        label: 'Very bad',
    },
    {
        icon: (0, jsx_runtime_1.jsx)(SentimentDissatisfied_1.default, { fontSize: "inherit", color: "error" }),
        label: 'Bad',
    },
    {
        icon: (0, jsx_runtime_1.jsx)(SentimentSatisfied_1.default, { fontSize: "inherit", color: "warning" }),
        label: 'Meh',
    },
    {
        icon: (0, jsx_runtime_1.jsx)(SentimentSatisfiedAltOutlined_1.default, { fontSize: "inherit", color: "success" }),
        label: 'Good',
    },
    {
        icon: (0, jsx_runtime_1.jsx)(SentimentVerySatisfied_1.default, { fontSize: "inherit", color: "success" }),
        label: 'Great',
    },
];
const Item = (0, styles_1.styled)(material_1.Paper)(({ theme }) => (Object.assign(Object.assign({ backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff' }, theme.typography.body2), { padding: theme.spacing(1), textAlign: 'center', color: theme.palette.text.secondary })));
function FaceRatingGroup() {
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true }, { children: customIcons.map((x, i) => ((0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "bottom", title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: x.label }) }, { children: (0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ xs: true, item: true }, { children: (0, jsx_runtime_1.jsx)(Item, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ sx: { fontSize: '4em' } }, { children: x.icon })) }) })) }), i))) })));
}
exports.FaceRatingGroup = FaceRatingGroup;
