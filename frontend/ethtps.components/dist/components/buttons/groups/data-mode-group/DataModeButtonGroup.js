"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModeButtonGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Types_1 = require("../../../../Types");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const CurrentViewersIcon_1 = require("../../CurrentViewersIcon");
const ethtps_data_1 = require("ethtps.data");
function DataModeButtonGroup(model) {
    const mode = (0, ethtps_data_1.useHandler)(model.modeHandle);
    const getColorComparedTo = (proposedMode) => proposedMode == (mode === null || mode === void 0 ? void 0 : mode.value) ? { color: 'primary' } : undefined;
    const experimentsAppStoreValue = (0, ethtps_data_1.useAppSelector)((state) => state.experiments);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: { float: 'right' } }, { children: [(0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(CurrentViewersIcon_1.CurrentViewersIcon, {}), (experimentsAppStoreValue === null || experimentsAppStoreValue === void 0 ? void 0 : experimentsAppStoreValue.includes(5)) && false), (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: 'top' }, getColorComparedTo(ethtps_data_1.DataType.Tps), { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Transactions per second" }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: () => mode === null || mode === void 0 ? void 0 : mode.setter(ethtps_data_1.DataType.Tps) }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.Numbers, {}) })) })), (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: 'top' }, getColorComparedTo(ethtps_data_1.DataType.Gps), { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Gas per second" }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: () => mode === null || mode === void 0 ? void 0 : mode.setter(ethtps_data_1.DataType.Gps) }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.LocalGasStation, {}) })) })), (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: 'top' }, getColorComparedTo(ethtps_data_1.DataType.GasAdjustedTps), { title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: "Gas-adjusted transactions per second" }) }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ onClick: () => mode === null || mode === void 0 ? void 0 : mode.setter(ethtps_data_1.DataType.GasAdjustedTps) }, { children: (0, jsx_runtime_1.jsx)(icons_material_1.EvStation, {}) })) }))] })) }));
}
exports.DataModeButtonGroup = DataModeButtonGroup;
