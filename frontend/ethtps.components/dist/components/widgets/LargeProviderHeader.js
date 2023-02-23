"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeProviderHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ethtps_data_1 = require("ethtps.data");
const react_1 = __importDefault(require("react"));
function LargeProviderHeader(config) {
    var _a, _b, _c;
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'box', style: { float: 'left' } }, { children: [(0, jsx_runtime_1.jsx)("img", Object.assign({ alt: `${(_a = config.provider) === null || _a === void 0 ? void 0 : _a.name} image`, src: `/provider-icons/${(_b = config.provider) === null || _b === void 0 ? void 0 : _b.name}.png` }, ethtps_data_1.inline, (0, ethtps_data_1.uniform)('2em'))), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({}, ethtps_data_1.inline, { sx: {
                        fontWeight: 'bold',
                        fontSize: '2em',
                        marginLeft: '0.2em',
                    } }, { children: (_c = config.provider) === null || _c === void 0 ? void 0 : _c.name }))] })) }));
}
exports.LargeProviderHeader = LargeProviderHeader;
